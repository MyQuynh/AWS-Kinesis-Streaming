import boto3
from datetime import datetime
import tweepy
import json
import time
from urllib3.exceptions import ProtocolError

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



class stream_listener(tweepy.StreamListener):

    def __init__(self):
        super(stream_listener, self).__init__()
        self.kinesis = boto3.client('firehose', region_name='us-east-2')

    def on_status(self, status):
        tweet = status.text
        twitter_df = {
            'tweet': tweet,
            'datetime': datetime.utcnow().timestamp(),
            'location': TWEET_LOCATION
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


def lambda_handler(event, context):
    ts = twitter_stream()
    ts.twitter_listener()
