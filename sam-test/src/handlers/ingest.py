import boto3
from datetime import datetime
import time
import json
import logging
import requests
import re
from PIL import Image
import requests
from instagrapi import Client
import numpy as np
import tensorflow as tf

# Loading model
model_path = './model/'
loaded_model = tf.saved_model.load(model_path)
MobileNetV2 = loaded_model.signatures['default']


# from unsplash.api import Api
# from unsplash.auth import Auth

# client_id = "a97YeRUJvYa7D0x4-CScYkZnIp_NDeT7E8XeSleeCSM"
# client_secret = "md4KUfazSwI_eupypWUZPC6CnDyb6y6UzFAitDWLcwE"
# redirect_uri = ""
# code = ""

# auth = Auth(client_id, client_secret, redirect_uri, code=code)
# api = Api(auth)

ACCESS_KEY = "a97YeRUJvYa7D0x4-CScYkZnIp_NDeT7E8XeSleeCSM"

ACCESS_KEY_RITEKIT = "7eddd2a9805f6196f964d51847b4ba16786346a4a807"

USERNAME = "rmit_1234"
PASSWORD = "rmit1234"
	

# The kinesis stream I defined in asw console
stream_name = 'DeliveryStream'


k_client = boto3.client('firehose', region_name='us-east-2')

cl = Client()
cl.login(USERNAME, PASSWORD)

# hashtag = cl.hashtag_info('downhill')

height = width = 160

# hashtag = cl.hashtag_info('downhill')

def getOnlyURL(url):
    l = url.split(', ')
    url = l[0]
    url = url.replace("HttpUrl(", "", 1)
    return url

def generateHashtag(caption):
    # hashtag_re = re.compile("(?:^|\s)[＃#]{1}(\w+)", re.UNICODE)
    return [tag.strip() for tag in caption[caption.find('#')+1:].split('#')]


def resizeImage(url):
    url = getOnlyURL(url)
    # Combine code 
    neural_net = construct_neural_network()
    image = prepare_image(get_image(url))
    deep_features = extract_features(image,neural_net)
    return deep_features


# get image as tensor from url 
def get_image(url):
    r = requests.get(onl_path)
    img = tf.io.decode_image(r.content)
    return img 
    
# Construct neural net to extract image features 
def construct_neural_network():
    img_shape = (160, 160, 3)

    # Create the base model from the pre-trained model MobileNet V2
    base_model = MobileNetV2(input_shape=img_shape, include_top=False, weights='imagenet')

    global_average_layer = tf.keras.layers.GlobalAveragePooling2D()

    neural_network = tf.keras.Sequential([
      base_model,
      global_average_layer,
    ])
    
    return neural_network
# extract features get the deep features from neural network to use later 
def extract_features(image, neural_network):
    """Return a vector of 1280 deep features for image."""
    images_np = np.expand_dims(image_np, axis=0)
    deep_features = neural_network.predict(images_np)[0]
    return deep_features
  
# transform image to numpy arrays
def prepare_image(img):
    img = tf.cast(img, tf.float32)
    img = (img/127.5) - 1
    img = tf.image.resize(img, (height, width))
    # Reshape grayscale images to match dimensions of color images
    if img.shape != (160, 160, 3):
        img = tf.concat([img, img, img], axis=2)
    return img.numpy()


def lambda_handler(event, context):

    listTrending  = trendingHashtag()

    for i in listTrending:
        
        medias = cl.hashtag_medias_recent(i, amount=20)
        
        # json_object = json.load(medias)

        medias = cl.hashtag_medias_recent(i, amount=20)
        
        # json_object = json.load(medias)

        for k in range(len(medias)):
            dictMedia = medias[k].dict()
            if (dictMedia['thumbnail_url'] == ""):
                break
            put_to_stream(getOnlyURL(str(dictMedia['thumbnail_url'])), generateHashtag(str(dictMedia['caption_text'])), str(dictMedia['caption_text']), resizeImage(str(dictMedia['thumbnail_url'])))
            time.sleep(10)

        # image = f"https://api.unsplash.com/photos/random?client_id={ACCESS_KEY}"

        # response = requests.get(image)

        # photo = response.json()

        # image_url = photo['urls']['full']
        # description = photo['alt_description']
        # location =  photo['location']['title']

        # # write the data to the stream
        # put_to_stream(image_url, description, location)

        # wait for 1 second
        time.sleep(10)

def trendingHashtag():
    
    trendingHashtag = f"https://api.ritekit.com/v1/search/trending?green=1&latin=1"

    trendingHashtagList = []

    response = requests.get(trendingHashtag)

    response = response.json()

    for i in (response['tags']):
        trendingHashtagList.append(i['tag'])
    
    return trendingHashtagList



def getListOfHashtag(image_url):
    hashtag = f"https://api.ritekit.com/v1/stats/hashtag-suggestions-image?image={image_url}&client_id={ACCESS_KEY_RITEKIT}"

    response = requests.get(hashtag)

    response = response.json()

    print(response['data'])

    listHashtag = []

    for i in response['data']:
        listHashtag.append(i['hashtag'])
    
    return listHashtag



def put_to_stream(image_url, hashtag, caption, features):

        
    payload = {
            'image_url': str(image_url),
            'hashtag': json.dumps(hashtag),
            'caption': str(caption),
            'features': json.dumps(features)
        }


    print(payload)

    response = k_client.put_record(
            DeliveryStreamName=stream_name,
            Record={
                'Data': (json.dumps(payload))
                    }
            )
 


    # put_response = k_client.put_record(StreamName=stream_name, Data = json.dump(payload))
    print(response)

    logging.info(response)
# from PIL import Image 
 
# def lambda_handler(event, context):
#     print(Image)
#     return {
#         'statusCode': 200,
#         'body': json.dumps('Hello from Lambda!')
#     }