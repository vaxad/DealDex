# from flask import Flask, jsonify
# import scrapetube

# app = Flask(__name__)

# @app.route('/get_videos', methods=['POST'])
# def get_videos():
#     product_name = request.form['product_name']
#     product_name+="review video"
#     videos = scrapetube.get_search(product_name)
    
#     ytvideos = []
#     for video in videos:
#         if len(ytvideos) >= 3:
#             break
#         video_details = {
#             'videoId': video['videoId'],
#             'thumbnail': video['thumbnail']['thumbnails'][1]["url"],  
#             'title': video['title']['runs'][0]['text'],          
#             'link': f"https://www.youtube.com/watch?v={video['videoId']}"
#         }
#         ytvideos.append(video_details)
    
#     return jsonify({'videos': ytvideos})

# if __name__ == '__main__':
#     app.run(debug=True, port="8088")
