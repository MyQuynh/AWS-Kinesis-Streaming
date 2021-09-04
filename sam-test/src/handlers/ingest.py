import boto3
from datetime import datetime
import calendar
import random
import time
import json
import logging
import requests

# from unsplash.api import Api
# from unsplash.auth import Auth

# client_id = "a97YeRUJvYa7D0x4-CScYkZnIp_NDeT7E8XeSleeCSM"
# client_secret = "md4KUfazSwI_eupypWUZPC6CnDyb6y6UzFAitDWLcwE"
# redirect_uri = ""
# code = ""

# auth = Auth(client_id, client_secret, redirect_uri, code=code)
# api = Api(auth)

ACCESS_KEY = "a97YeRUJvYa7D0x4-CScYkZnIp_NDeT7E8XeSleeCSM"

	

# The kinesis stream I defined in asw console
stream_name = 'DeliveryStream'


k_client = boto3.client('firehose', region_name='us-east-2')


def lambda_handler(event, context):

    for i in range(10):

        image = f"https://api.unsplash.com/photos/random?client_id={ACCESS_KEY}"

        response = requests.get(image)

        photo = response.json()

        image_url = photo['urls']['raw']
        description = photo['alt_description']
        location =  photo['location']['title']

        # write the data to the stream
        put_to_stream(image_url, description, location)

        # wait for 1 second
        time.sleep(10)

def put_to_stream(image_url, description, location):
        
    payload = {
            'image_url': str(image_url),
            'description': str(description),
            'location': str(location)
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