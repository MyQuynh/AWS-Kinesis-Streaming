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


ACCESS_KEY = "a97YeRUJvYa7D0x4-CScYkZnIp_NDeT7E8XeSleeCSM"

ACCESS_KEY_RITEKIT = "7eddd2a9805f6196f964d51847b4ba16786346a4a807"

USERNAME = "rmit_1234"
PASSWORD = "rmit1234"
	

# The kinesis stream I defined in asw console
stream_name = 'DeliveryStream2'


k_client = boto3.client('firehose', region_name='us-east-2')

cl = Client()
cl.login(USERNAME, PASSWORD)

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

def lambda_handler(event, context):

    listTrending  = ["travel", "food", "animals", "selfie", "cars", "fitness", "babies", "wedding", "nature", "architecture"]

    for i in listTrending:
        
        medias = cl.hashtag_medias_recent(i, amount=20)
        
        # json_object = json.load(medias)

        medias = cl.hashtag_medias_recent(i, amount=20)
        
        # json_object = json.load(medias)

        for k in range(len(medias)):
            dictMedia = medias[k].dict()
            if (dictMedia['thumbnail_url'] is None):
                continue
            put_to_stream(getOnlyURL(str(dictMedia['thumbnail_url'])), generateHashtag(str(dictMedia['caption_text'])), str(dictMedia['caption_text']))
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

# def trendingHashtag():
#     trendingHashtag = f"https://api.ritekit.com/v1/search/trending?green=1&latin=1"

#     trendingHashtagList = []

#     response = requests.get(trendingHashtag)

#     response = response.json()

#     for i in (response['tags']):
#         trendingHashtagList.append(i['tag'])
    
#     return trendingHashtagList



def getListOfHashtag(image_url):
    hashtag = f"https://api.ritekit.com/v1/stats/hashtag-suggestions-image?image={image_url}&client_id={ACCESS_KEY_RITEKIT}"

    response = requests.get(hashtag)

    response = response.json()

    print(response['data'])

    listHashtag = []

    for i in response['data']:
        listHashtag.append(i['hashtag'])
    
    return listHashtag



def put_to_stream(image_url, hashtag, caption):

        
    payload = {
            'image_url': str(image_url),
            'hashtag': json.dumps(hashtag),
            'caption': str(caption)
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
