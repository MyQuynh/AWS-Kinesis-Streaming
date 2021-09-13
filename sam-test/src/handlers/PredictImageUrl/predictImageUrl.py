import json
import requests
import gzip
import pickle
import base64
from PIL import Image

# MODEL_FILE = 's3://bucket/model.tar.gz'
# with gzip.open(MODEL_FILE, 'rb') as f:
#     MODEL = pickle.load(f)


# get image as tensor from url 
# def get_image(url):
#     r = requests.get(url)
#     img = tf.io.decode_image(r.content)
#     return img 


def lambda_handler(event, context):
    

    try:
        image = Image.open(requests.get(event['body'], stream=True).raw)
    except:
        return {
                "statusCode": 200,
                "body": json.dumps({
                "message" : "ERROR! Cannot find the url",
            }),
        }

    print(image)
    return {
        "statusCode": 200,
        "body": str(image),
    }
