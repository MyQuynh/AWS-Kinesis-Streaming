import boto3
from datetime import datetime
import time
import json
import logging
import requests

from instagrapi import Client


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

def getOnlyURL(url):
    l = url.split(', ')
    url = l[0]
    url = url.replace("HttpUrl(", "", 1)
    return url


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
            put_to_stream(getOnlyURL(str(dictMedia['thumbnail_url'])), i)
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



def put_to_stream(image_url, hashtag):

        
    payload = {
            'image_url': str(image_url),
            'hashtag': str(hashtag)
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