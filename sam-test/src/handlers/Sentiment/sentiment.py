from textblob import TextBlob
import json
import requests
import gzip
import pickle
import boto3
import io
from io import BytesIO
from datetime import date, timedelta

BUCKET = 'kinesis-s3records-16jckkpyv314r'
FILE = 'twitter/'


session = boto3.Session(
    aws_access_key_id="AKIAQLDJ3WTIONXQA36D",
    aws_secret_access_key="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",
)
s3_r = boto3.resource('s3', region_name='us-east-2')

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

# def read_word_from_s3(bucket, key):

#     bucket = s3.Bucket(bucket)
#     object = bucket.Object(key)
#     response = object.get()
#     file_stream = response['Body']
#     im = Image.open(file_stream)
#     return np.array(im)
def getDateTime(prefix):
    today = date.today() - timedelta(days=1)
    d1 = today.strftime("%Y/%m/%d/%H")
    return prefix + d1 + "/"


def read_word_from_s3():

    list_array = []
    print(getDateTime(FILE))
    bucket = s3_r.Bucket(BUCKET)
    for obj in bucket.objects.filter(Prefix=FILE).all():
        buffer = BytesIO(obj.get()['Body'].read())
        gzipfile = gzip.GzipFile(fileobj=buffer)
        for line1 in gzipfile:
            # list_array += (json.loads(line.decode())['hashtag'])
            # print(json.loads(line.decode())['hashtag'])
            # print(line.decode())
            try:
                json_list = line1.decode("utf-8").replace("'", '"')

                for line in json_list.split("}"):

                    json_content = json.loads(line+"}")['hashtag']

                    json_content = json_content.replace("[", '')
                    json_content = json_content.replace("]", '')
                    
                    hashtags = json_content.split(", ")

                    for i in range(len(hashtags)):

                        list_array.append(hashtags[i].replace('"', ''))


            except:
                pass
        if(len(json_list) > 10000):
            break


            # json_object = json.loads(line)
            # print(json_object)
    # bucket = s3.list_objects_v2(Bucket=BUCKET, Prefix = getDateTime(FILE))
    # for content in bucket["Contents"]:
    #     key = content["Key"]
    #     sub_list_1.append(key)

    # for hashtag in sub_list_1:
    #     print(hashtag)
    #     result = s3_r.Object(Bucket=BUCKET, Key=hashtag)
    #     print(result)
    #     with gzip.GzipFile(fileobj=result.get()["Body"]) as gzipfile:
    #         content = gzipfile.read()
    #         print(content)
    #     text = result["Body"].read().decode()
    #     list_array += text['hashtag']
    return list_array


def createDictionary(array):
    wordFreq = {}

    for word in array:
        if word not in wordFreq:
            wordFreq[word] = 1
        else:
            wordFreq[word] += 1

    return wordFreq

def createJson(dict):
    listJson = []
    for key, value in dict.items():
        listJson.append(
            {
                "text" : key,
                "value": value    
            }
        )
    return listJson

def getSentiment(dict):

    words = dict.keys()
    print(words)
    score = []

    for word in words:
        processedWord = TextBlob(word.replace("#",""))
        score.append(processedWord.sentiment.polarity)

    print(score)
    print(sum(score))
    print(len(score))
    return sum(score) / len(score)


def handler(event, context):

    print("Event")
    print(event)

    list_hashtags = read_word_from_s3()

    count_frequency = createDictionary(list_hashtags)

    listJson = createJson(count_frequency)

    score = getSentiment(count_frequency)

    return {
        "headers": { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        "statusCode": 200,
        "body": json.dumps({
            "hashtags": listJson,
            "score": score
        })
    }