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

app = Flask(__name__) 

#ENV Variables
load_dotenv()
S3_BUCKET = os.getenv('S3_BUCKET')
TWILIO_ACCOUNT_SID = os.getenv('TWILIO_ACCOUNT_SID')
TWILIO_AUTH_TOKEN = os.getenv('TWILIO_AUTH_TOKEN')
TWILIO_PHONE_NUMBER = os.getenv('TWILIO_PHONE_NUMBER')

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
    print(incoming_message)
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
    
@app.route('/', methods=['GET']) 
def defaultroute(): 
	if(request.method == 'GET'): 
		data = {"Message": "LOC Backend is running"} 
		return jsonify(data) 
    
if __name__ == '__main__': 
	app.run(debug=True,port=8000) 
