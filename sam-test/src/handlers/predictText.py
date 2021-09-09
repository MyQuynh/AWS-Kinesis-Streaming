import json
import requests
import gzip
import pickle

MODEL_FILE = 's3://bucket/model.tar.gz'
with gzip.open(MODEL_FILE, 'rb') as f:
    MODEL = pickle.load(f)


def predict(text):
    return "yayy"


def lambda_handler(event, context):

    tweet = event['body']

    if (tweet == None):
        return {
        "statusCode": 200,
        "body": json.dumps({
            "message" : "ERROR! Cannot subscribe with NULL email field. Please check again!",
        }),
    }

    return {
        "statusCode": 200,
        "body": json.dumps(predict(tweet)),
    }
