import json
import requests
import gzip
import pickle
from PIL import Image
import boto3
import io
from io import BytesIO
from io import StringIO
import numpy as np
import tensorflow as tf
from tensorflow.keras.applications import MobileNetV2
import pandas as pd
from scipy.spatial.distance import cosine
import ast


s3 = boto3.resource('s3', region_name='us-east-2')
client = boto3.client('s3', region_name='us-east-2')


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

# def read_image_from_s3(bucket, key):

#     bucket = s3.Bucket(bucket)
#     object = bucket.Object(key)
#     response = object.get()
#     file_stream = response['Body']
#     im = Image.open(file_stream)
#     return np.array(im)

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

# function to write csv file to bucket
def save_df(df,file_name):
    bucket = "kinesis-s3records-16jckkpyv314r"
    csv_buffer = StringIO()
    df.to_csv(csv_buffer)

    s3_resource = boto3.resource('s3')
    s3_resource.Object(bucket, f'dataframe/{file_name}').put(Body=csv_buffer.getvalue())

# function to read csv file from bucket
def read_csv_file(bucket,key):
    obj = client.get_object(Bucket=bucket, Key=f'dataframe/{key}')
    df = pd.read_csv(io.BytesIO(obj['Body'].read()))
    return df

def fetch_image_from_s3_to_array(client,bucket, key):
    """Fetches an image from S3 and returns a numpy array."""
    response = client.get_object(Bucket=bucket, Key=key)
    body = response["Body"]
    data = body.read()
    f = BytesIO(data)
    image = Image.open(f)
    image_data = np.asarray(image)
    return image_data

neural_net = construct_neural_network()

def get_hashtags(df_features, hashtags_df,images_features,hashtag_features,neural_net = neural_net, url = None,client = client ,bucket=None,key = None,number = 20):
    if url:
        deep_features = get_vector_url(url,neural_net)
#         print(type(deep_features[0]))
    else:
        image = fetch_image_from_s3_to_array(client,bucket,key)
        deep_features = get_vector_img(image,neural_net)
    df_rec = df_features.copy()
    chosen = find_neighbor_vectors(deep_features,df_rec)
    def get_list(chosen_vectors,images_features):
        list_return = []
        for i in chosen_vectors.index.tolist():
            try:
                list_return.append(images_features.loc[i,"features"])
            except:
                pass
        return list_return
            
    list_features_combine = get_list(chosen,images_features )
    average_features = np.asarray(list_features_combine).mean(axis = 0)
    hashtags = hashtag_features.copy()
    hashtags["dot_product"] = hashtags.features.apply(lambda x: np.asarray(x).dot(average_features))
    final_recs = hashtags.sort_values(by='dot_product', ascending=False).head(number)
    # Look up hashtags by their numeric IDs
    output = []
    for hashtag_id in final_recs.index.values:
        output.append(hashtags_df.iloc[hashtag_id]['hashtag'])

    return output


# extract features get the deep features from neural network to use later 
def extract_features(image, neural_network):
    """Return a vector of 1280 deep features for image."""
    images = np.expand_dims(image, axis=0)
    deep_features = neural_network.predict(images)[0]
    return deep_features

# get image as tensor from url 
def get_image(url):
    r = requests.get(url)
    img = tf.io.decode_image(r.content)
    return img 

# use for testing on this trial
def get_vector_url(url,neural_network):
    image = prepare_image(get_image(url))
    return extract_features(image,neural_network)

# use for EMR notebook 
def get_vector_img(img,neural_network):
    img = prepare_image(img)
    return extract_features(img,neural_network)


# helper function for image hashtag generators
def find_neighbor_vectors(features,recommender_df, k=5):
    """Find image features (user vectors) for similar images."""
    rdf = recommender_df.copy()
    rdf['dist'] = rdf['deep_feature'].apply(lambda x: cosine(x, features))
    rdf = rdf.sort_values(by='dist')
    return rdf.head(k)

# transform image to numpy arrays
def prepare_image(img,height = 160,width = 160):
    img = tf.cast(img, tf.float32)
    img = (img/127.5) - 1
    img = tf.image.resize(img, (height, width))
    # Reshape grayscale images to match dimensions of color images
    if img.shape != (160, 160, 3):
        img = tf.concat([img, img, img], axis=2)
    return img.numpy()


def handler(event, context):

    # print(event)

    image = event['key']

    # image = event['text']

    print(image)

    bucketname = "kinesis-s3records-16jckkpyv314r"
    keyname = "df_features.csv"
    df_features = read_csv_file(bucketname,keyname)
    df_features["deep_feature"] = df_features["deep_feature"].apply(lambda x: np.fromstring(x[1:-1],sep=", ") )

    hashtags_file = "hashtags.csv"
    hashtags_df = read_csv_file(bucketname,hashtags_file)

    image_features = read_csv_file(bucketname,"img_features.csv")
    image_features["features"] = image_features["features"].apply(lambda x: ast.literal_eval(x))
    image_features = image_features.set_index("id")

    hashtag_features = read_csv_file(bucketname,"hashtag_features.csv")
    hashtag_features["features"] = hashtag_features["features"].apply(lambda x: ast.literal_eval(x))
    hashtag_features = hashtag_features.set_index("id")

    list_hastags = get_hashtags(df_features, hashtags_df, image_features, hashtag_features, neural_net = neural_net, bucket="kinesis-s3records-16jckkpyv314r", key=image)

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
        "headers": {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        "statusCode": 200,
        "body": {
            "hashtags": json.dumps(list_hastags)
        }
    }
