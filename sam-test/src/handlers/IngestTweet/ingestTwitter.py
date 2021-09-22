import boto3
from datetime import datetime
import tweepy
import json
import time
from urllib3.exceptions import ProtocolError
#!/usr/bin/env python
import nltk
nltk.data.path.append("/tmp")
nltk.download("stopwords", download_dir = "/tmp")
nltk.download('wordnet', download_dir = "/tmp")
from nltk.corpus import stopwords 
from nltk.stem.wordnet import WordNetLemmatizer
import gensim
from gensim import corpora
import string
import argparse
import re
import requests

TWIITER_API_GEOBOX_FILTER = [-74.1687,40.5722,-73.8062,40.9467] # New york city
TWITTER_API_LANGS_FILTER = ['en']


# Twitter API Keys
access_token = "1406998637968707587-rB8uNaxeHV8YoyL9jlaNim4CQadvgg"
access_token_secret = "Ya2e6v4RmIdWiXrWS5zfIlWh3F8g3C7s0mKN3ZYOpQCgN"
consumer_key = "QhlgDDE3BPFMu0Je3yiOsj1dx"
consumer_secret = "ZvMoa7emEzvGp1rdg1NDAdm2fM592MGKGfzvbPY5YGQp58O5MX"


# a static location is used for now as a
# geolocation filter is imposed on twitter API
TWEET_LOCATION = 'New York City'

	

# The kinesis stream I defined in asw console
stream_name = 'DeliveryStreamTwitter'


k_client = boto3.client('firehose', region_name='us-east-2')

def extractHashtag(text):

    stop = set(stopwords.words("english"))
    exclude = set(string.punctuation) 
    lemma = WordNetLemmatizer()
    
    doc_complete = text.split('\n')

    def clean(doc):
        stop_free = " ".join([i for i in doc.lower().split() if i not in stop])
        punc_free = ''.join(ch for ch in stop_free if ch not in exclude)
        normalized = " ".join(lemma.lemmatize(word) for word in punc_free.split())
        return normalized

    doc_clean = [clean(doc).split() for doc in doc_complete]    
    dictionary = corpora.Dictionary(doc_clean)
    doc_term_matrix = [dictionary.doc2bow(doc) for doc in doc_clean]
    Lda = gensim.models.ldamodel.LdaModel
    ldamodel = Lda(doc_term_matrix, num_topics=4, id2word = dictionary, passes=50)
    topic = ldamodel.print_topics(num_topics=5, num_words=5)

    hashtags = []
    for t in topic: 
        for h in t[1].split('+'):
            hashtags.append('#'+h[h.find('"')+1:h.rfind('"')])

    print("HashTags: ")
    for ht in list(set(hashtags)):
        print(ht, end=' ')

    return hashtags

class stream_listener(tweepy.StreamListener):

    def __init__(self):
        super(stream_listener, self).__init__()
        self.kinesis = boto3.client('firehose', region_name='us-east-2')

    def on_status(self, status):
        tweet = status.text
        twitter_df = {
            'tweet': str(tweet),
            'hashtag': json.dumps(extractHashtag(tweet)),
            'datetime': str(datetime.utcnow().timestamp()),
            'location': str(TWEET_LOCATION)
        }

        print(tweet)

        self.kinesis.put_record(
                    DeliveryStreamName=stream_name,
                    Record={
                    'Data': (json.dumps(twitter_df))
                    }
        )

        return True

    def on_error(self, status_code):
        if status_code == 420:
            # returning False in on_error disconnects the stream
            return False
        print('Streaming Error: ' + str(status_code))


class twitter_stream():

    def __init__(self):
        self.auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
        self.auth.set_access_token(access_token, access_token_secret)
        self.stream_listener = stream_listener()

    def twitter_listener(self):
        stream = tweepy.Stream(auth=self.auth, listener=self.stream_listener)
        while True:
            try:
                stream.filter(locations=TWIITER_API_GEOBOX_FILTER,
                      languages=TWITTER_API_LANGS_FILTER, stall_warnings=True)

            except (ProtocolError, AttributeError):
                continue

def handler(event, context):
    ts = twitter_stream()
    ts.twitter_listener()
