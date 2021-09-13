import json
import requests
import gzip
import pickle
from PIL import Image
import boto3
from io import BytesIO
import numpy as np

# MODEL_FILE = 's3://bucket/model.tar.gz'
# with gzip.open(MODEL_FILE, 'rb') as f:
#     MODEL = pickle.load(f)


s3 = boto3.resource('s3', region_name='us-east-2')

class NumpyEncoder(json.JSONEncoder):
    """ Special json encoder for numpy types """
    def default(self, obj):
        if isinstance(obj, np.integer):
            return int(obj)
        elif isinstance(obj, np.floating):
            return float(obj)
        elif isinstance(obj, np.ndarray):
            return obj.tolist()
        return json.JSONEncoder.default(self, obj)

def read_image_from_s3(bucket, key):

    bucket = s3.Bucket(bucket)
    object = bucket.Object(key)
    response = object.get()
    file_stream = response['Body']
    im = Image.open(file_stream)
    return np.array(im)


def handler(event, context):

    tweet = event['body']

    # data = s3.get_object(Bucket='kinesis-s3records-lpe10xm71t8x', Key='huhu.png')
    # contents = data['Body'].read()
    # print(contents)

    # image = base64.decodestring(json.dumps(event)['image'])

    # if (event['image']):
    #     image = base64.decodestring(json.dumps(event)['image'])
    # else:
    #     try:
    #         image = Image.open(requests.get(event['body'], stream=True).raw)
    #     except:
    #         return {
    #                 "statusCode": 200,
    #                 "body": json.dumps({
    #                 "message" : "ERROR! Cannot find the url",
    #             }),
    #         }

    return {
        "statusCode": 200,
        "body": json.dumps(read_image_from_s3("kinesis-s3records-lpe10xm71t8x","image/huhu.png"), cls=NumpyEncoder),
    }
