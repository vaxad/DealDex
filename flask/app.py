from flask import Flask, jsonify, request , send_file, Response
import boto3
import botocore
from botocore.exceptions import ClientError
import os
from twilio.rest import Client
from dotenv import load_dotenv
from twilio.twiml.messaging_response import MessagingResponse
from selectorlib import Extractor
import requests
import json
import csv
from dateutil import parser as dateparser
from wordcloud import WordCloud
import matplotlib.pyplot as plt
from transformers import pipeline
import uuid
import cloudinary
from cloudinary.uploader import upload
from cloudinary.utils import cloudinary_url
from io import BytesIO
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings
import google.generativeai as genai
from langchain.vectorstores import FAISS
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.chains.question_answering import load_qa_chain
from langchain.prompts import PromptTemplate
app = Flask(__name__) 

#ENV Variables
load_dotenv()
S3_BUCKET = os.getenv('S3_BUCKET')
TWILIO_ACCOUNT_SID = os.getenv('TWILIO_ACCOUNT_SID')
TWILIO_AUTH_TOKEN = os.getenv('TWILIO_AUTH_TOKEN')
TWILIO_PHONE_NUMBER = os.getenv('TWILIO_PHONE_NUMBER')
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
FLASK_URL = "https://4scjblv6-8000.inc1.devtunnels.ms/"
e = Extractor.from_yaml_file('amazonreviewselectors.yml')
sentiment_analysis_pipeline = pipeline("sentiment-analysis")
STATIC_FOLDER = 'static'

cloudinary.config(
    cloud_name="dhoybhn0n",
    api_key="673261966941744",
    api_secret="YcdeBlD2TmQjasUy-PjlD-kjgc0"
)


#CLIENTS
client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
s3 = boto3.client('s3')
ses_client = boto3.client('ses')

#Functions
def create_extractor(url):
    if("amazon" in url):
        return Extractor.from_yaml_file('selectorsAmazon.yml')
    elif("flipkart" in url):
        return Extractor.from_yaml_file('selectorsFlipkart.yml')
    elif("ebay" in url):
        return Extractor.from_yaml_file('selectorsEbay.yml')

def review_scrape(url):
    headers = {
        'authority': 'www.amazon.com',
        'pragma': 'no-cache',
        'cache-control': 'no-cache',
        'dnt': '1',
        'upgrade-insecure-requests': '1',
        'user-agent': 'Mozilla/5.0 (X11; CrOS x86_64 8172.45.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.64 Safari/537.36',
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'sec-fetch-site': 'none',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-dest': 'document',
        'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
    }
    print("Downloading %s" % url)
    r = requests.get(url, headers=headers)
    if r.status_code > 500:
        if "To discuss automated access to Amazon data please contact" in r.text:
            print("Page %s was blocked by Amazon. Please try using better proxies\n" % url)
        else:
            print("Page %s must have been blocked by Amazon as the status code was %d" % (url, r.status_code))
        return None
    return e.extract(r.text)

def get_text_chunks(text):
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=10000, chunk_overlap=1000)
    chunks = splitter.split_text(text)
    return chunks  


def get_vector_store(chunks):
    embeddings = GoogleGenerativeAIEmbeddings(
        model="models/embedding-001")  
    vector_store = FAISS.from_texts(chunks, embedding=embeddings)
    vector_store.save_local("faiss_index")


def get_conversational_chain():
    prompt_template = """
    Answer the question as detailed as possible from the provided context, make sure to provide all the details, if the answer is not in
    provided context just say, "answer is not available in the context", don't provide the wrong answer\n\n
    Context:\n {context}?\n
    Question: \n{question}\n

    Answer:
    """
    model = ChatGoogleGenerativeAI(model="gemini-pro",
                                   client=genai,
                                   temperature=0.3,
                                   )
    prompt = PromptTemplate(template=prompt_template,
                            input_variables=["context", "question"])
    chain = load_qa_chain(llm=model, chain_type="stuff", prompt=prompt)
    return chain

def user_input(user_question):
    embeddings = GoogleGenerativeAIEmbeddings(
        model="models/embedding-001")  # type: ignore

    new_db = FAISS.load_local("faiss_index", embeddings,allow_dangerous_deserialization=True)
    docs = new_db.similarity_search(user_question)

    chain = get_conversational_chain()

    response = chain(
        {"input_documents": docs, "question": user_question}, return_only_outputs=True, )

    print(response)
    return response

#API Routes
@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({'error': 'No selected file'})
    
    try:
        s3.upload_fileobj(file, S3_BUCKET, file.filename)
        return jsonify({'success': True, 'message': 'File uploaded successfully'})
    except Exception as e:
        return jsonify({'error': str(e)})

@app.route('/delete/<filename>', methods=['DELETE'])
def delete_file(filename):
    try:
        s3.delete_object(Bucket=S3_BUCKET, Key=filename)
        return jsonify({'success': True, 'message': f'File {filename} deleted successfully'})
    except botocore.exceptions.ClientError as e:
        if e.response['Error']['Code'] == "NoSuchKey":
            return jsonify({'error': f'File {filename} not found'})
        else:
            return jsonify({'error': str(e)})

@app.route('/download/<filename>', methods=['GET'])
def download_file(filename):
    try:
        response = s3.get_object(Bucket=S3_BUCKET, Key=filename)
        file_content = response['Body'].read()
        save_dir = 'downloaded_images'
        os.makedirs(save_dir, exist_ok=True) 
        with open(os.path.join(save_dir, filename), 'wb') as f:
            f.write(file_content)
        return jsonify({'success': True, 'message': f'File {filename} downloaded and saved successfully {response}'})
    except botocore.exceptions.ClientError as e:
        if e.response['Error']['Code'] == "NoSuchKey":
            return jsonify({'error': f'File {filename} not found'})
        else:
            return jsonify({'error': str(e)})

@app.route('/send_email', methods=['POST'])
def send_email():
    try:
        recipient_email = request.form['recipient_email']
        sender_email = 'mihirpanchal5400@gmail.com'
        subject = request.form['subject']
        html_body = request.form['html_body']

        response = ses_client.send_email(
            Destination={
                'ToAddresses': [
                    recipient_email,
                ],
            },
            Message={
                'Body': {
                    'Html': {
                        'Charset': 'UTF-8',
                        'Data': html_body,
                    },
                },
                'Subject': {
                    'Charset': 'UTF-8',
                    'Data': subject,
                },
            },
            Source=sender_email,
        )
        return jsonify({'message': 'Email sent successfully'}), 200
    except ClientError as e:
        return jsonify({'error': str(e)}), 500

@app.route('/send_whatsapp_text', methods=['POST'])
def send_whatsapp_text():
    try:
        recipient_number = request.form['recipient_number']
        number = "whatsapp:"+recipient_number
        message_body = request.form['message_body']

        message = client.messages.create(
        from_=f'whatsapp:{TWILIO_PHONE_NUMBER}',
        body=message_body,
        to=number
        )
        
        return jsonify({'message': 'WhatsApp message sent successfully', 'message_sid': message.sid}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/send_whatsapp_image', methods=['POST'])
def send_whatsapp_image():
    try:
        recipient_number = request.form['recipient_number']
        number = "whatsapp:"+recipient_number
        image_url = request.form['image_url']
        caption = request.form['caption']
        message = client.messages.create(
            from_=f'whatsapp:{TWILIO_PHONE_NUMBER}',
            body=caption,
            media_url=[image_url],
            to=number
        )
        return jsonify({'message': 'WhatsApp message with image sent successfully', 'message_sid': message.sid}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/send_whatsapp_contact', methods=['POST'])
def send_whatsapp_contact():
    try:
        recipient_number = request.form['recipient_number']
        number = "whatsapp:" + recipient_number
        contact_name = request.form['contact_name']
        contact_number = request.form['contact_number']
        
        contact_info = f"{contact_name} : {contact_number}"
        
        message = client.messages.create(
            from_=f'whatsapp:{TWILIO_PHONE_NUMBER}',
            body=contact_info,
            to=number
        )

        return jsonify({'message': 'WhatsApp message with contact sent successfully', 'message_sid': message.sid}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/send_whatsapp_response', methods=['POST'])
def send_whatsapp_response():
    incoming_message = request.form.get('Body', '')
    
    twiml = MessagingResponse()
    twiml.message("Varad" + incoming_message)
    return str(twiml)

@app.route('/scrape', methods=['POST'])
def scrape():
    try:
        data = request.get_json()
        url = data['url']
        
        e = create_extractor(url)
        headers = {
            'dnt': '1',
            'upgrade-insecure-requests': '1',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36',
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'sec-fetch-site': 'same-origin',
            'sec-fetch-mode': 'navigate',
            'sec-fetch-user': '?1',
            'sec-fetch-dest': 'document',
            'referer': 'https://www.amazon.com/',
            'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
        }

        print("Downloading %s" % url)
        r = requests.get(url, headers=headers)
        if r.status_code > 500:
            if "To discuss automated access to Amazon data please contact" in r.text:
                return jsonify({"error": "Page was blocked by Amazon. Please try using better proxies."}), 403
            else:
                return jsonify({"error": f"Page must have been blocked by Amazon as the status code was {r.status_code}"}), 403

        result = e.extract(r.text)
        result['price'] = result['price'].replace(' .', '') 
        return jsonify(result)

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/scrape_amazon_reviews', methods=['POST'])
def scrape_amazon_reviews():
    url = request.form.get('url')
    if not url:
        return jsonify({'error': 'URL not provided'}), 400

    reviews_data = []  
    data = review_scrape(url) 
    if data and 'reviews' in data:
        for r in data['reviews']:
            review = {}
            review["title"] = r.get("title", "")
            review["content"] = r.get("content", "")
            reviews_data.append(review)

    sentiment_analysis_pipeline = pipeline("sentiment-analysis")

    review_sentiments = []
    for review in reviews_data:
        sentiment_prediction = sentiment_analysis_pipeline(review['content'])[0]
        sentiment_score = sentiment_prediction['score']
        sentiment_label = sentiment_prediction['label']
        review['sentiment'] = sentiment_label
        review_sentiments.append(sentiment_score)

    overall_sentiment_score = sum(review_sentiments) / len(review_sentiments)
    overall_sentiment_label = "Positive" if overall_sentiment_score > 0.5 else "Negative" 

    all_reviews_content = ' '.join([review['content'] for review in reviews_data])
    wordcloud = WordCloud(width=800, height=400, background_color='white').generate(all_reviews_content)

    wordcloud_upload = upload(wordcloud.to_image(), folder="wordclouds")

    wordcloud_url, _ = cloudinary_url(wordcloud_upload['public_id'], format=wordcloud_upload['format'], width=800, height=400)


    response_data = {
        'wordcloud_image_url': wordcloud_url,
        'overall_sentiment': {
            'label': overall_sentiment_label,
            'score': overall_sentiment_score
        },
        'reviews': reviews_data
    }
    return jsonify(response_data), 200


@app.route('/send_whatsapp_review', methods=['POST'])
def send_whatsapp_review():
    try:
        recipient_number = "+919833371632"
        url = request.form.get('Body', '')
        print(url)
        reviews_data = []  
        data = review_scrape(url) 
        rev = ""
        if data and 'reviews' in data:
            for r in data['reviews']:
                review = {}
                review["title"] = r.get("title", "")
                review["content"] = r.get("content", "")
                rev += review["content"] + "\n"
                reviews_data.append(review)

        sentiment_analysis_pipeline = pipeline("sentiment-analysis")

        review_sentiments = []
        for review in reviews_data:
            sentiment_prediction = sentiment_analysis_pipeline(review['content'])[0]
            sentiment_score = sentiment_prediction['score']
            sentiment_label = sentiment_prediction['label']
            review['sentiment'] = sentiment_label
            review_sentiments.append(sentiment_score)

        text_chunks = get_text_chunks(rev)
        get_vector_store(text_chunks)
        response = user_input("Summarize the reviews and give an overall review about the pros and cons of the product")

        overall_sentiment_score = sum(review_sentiments) / len(review_sentiments)
        overall_sentiment_label = "Positive" if overall_sentiment_score > 0.5 else "Negative" 

        all_reviews_content = ' '.join([review['content'] for review in reviews_data])
        wordcloud = WordCloud(width=800, height=400, background_color='white').generate(all_reviews_content)

        img_bytes = BytesIO()
        wordcloud.to_image().save(img_bytes, format='PNG')
        img_bytes.seek(0)

        wordcloud_upload = cloudinary.uploader.upload(img_bytes, folder="wordclouds")

        wordcloud_url, _ = cloudinary_url(wordcloud_upload['public_id'], format=wordcloud_upload['format'], width=800, height=400)

        response_data = {
            'wordcloud_image_url': wordcloud_url,
            'overall_sentiment': {
                'label': overall_sentiment_label,
                'score': overall_sentiment_score
            },
            'reviews': reviews_data
        }
        
        number = "whatsapp:"+recipient_number
        image_url = wordcloud_url
        caption = "Sentiment Analysis : " + str(response_data['overall_sentiment']['score']*100) + "\n" + response['output_text']
        message = client.messages.create(
            from_=f'whatsapp:{TWILIO_PHONE_NUMBER}',
            body=caption,
            media_url=[image_url],
            to=number
        )
        return jsonify({'message': 'WhatsApp message with image sent successfully', 'message_sid': message.sid}), 200
    except Exception as e:
        print("Exception occurred:", e)
        client.messages.create(
            from_=f'whatsapp:{TWILIO_PHONE_NUMBER}',
            body="An error occurred while processing the request. Please check the server logs for more details.",
            to="whatsapp:"+recipient_number
        )
        return jsonify({'message': 'Error occurred. WhatsApp message sent.'}), 500
    
@app.route('/static/<filename>')
def serve_wordcloud(filename):
    return send_file(os.path.join(STATIC_FOLDER, filename))

@app.route('/', methods=['GET']) 
def defaultroute(): 
	if(request.method == 'GET'): 
		data = {"Message": "LOC Backend is running"} 
		return jsonify(data)
    
if __name__ == '__main__': 
	app.run(debug=True,port=8000) 