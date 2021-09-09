import json
import requests
import gzip
import pickle
import base64
from PIL import Image

MODEL_FILE = 's3://bucket/model.tar.gz'
with gzip.open(MODEL_FILE, 'rb') as f:
    MODEL = pickle.load(f)


def predict(text):
    return "yayy"


def lambda_handler(event, context):

    image = base64.decodestring(json.dumps(event)['image'])

    if (event['image']):
        image = base64.decodestring(json.dumps(event)['image'])
    else:
        try:
            image = Image.open(requests.get(event['body'], stream=True).raw)
        except:
            return {
                    "statusCode": 200,
                    "body": json.dumps({
                    "message" : "ERROR! Cannot find the url",
                }),
            }


    return {
        "statusCode": 200,
        "body": json.dumps(predict(image)),
    }
