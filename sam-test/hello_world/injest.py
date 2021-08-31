import boto3
from datetime import datetime
import calendar
import random
import time
import json
	

# The kinesis stream I defined in asw console
stream_name = 'kstream1'


k_client = boto3.client('kinesis', region_name='us-east-1')


def lambda_handler(event, context):

    for i in range(10):
        property_value = random.randint(0, 100)
        property_timestamp = calendar.timegm(datetime.utcnow().timetuple())
        the_data = 'testString' + str(property_value)
        
        # write the data to the stream
        put_to_stream(the_data, property_value, property_timestamp)


        # wait for 1 second
        time.sleep(1)
        
def put_to_stream(the_data, property_value, property_timestamp):
        
    payload = {
            'prop': str(property_value),
            'timestamp': str(property_timestamp),
            'the_data': the_data
            }


    print(payload)


    put_response = k_client.put_record(StreamName=stream_name,Data​=json.dumps(payload),PartitionKey=the_data)