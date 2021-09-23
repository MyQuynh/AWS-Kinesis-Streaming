from boto3 import client as boto3_client
from datetime import datetime
import json

lambda_client = boto3_client('lambda', 'us-east-2')

def remove_duplicate(arr):
    mylist = list(dict.fromkeys(arr))
    return mylist


def lambda_handler(event, context):

    msg = json.loads(event['body'])
   
    invoke_response = lambda_client.invoke(FunctionName="GetPredictTextUrlFunction",
                                           InvocationType='RequestResponse',
                                           Payload=json.dumps(msg))
    

    result = invoke_response['Payload'].read()

    print(result)


    result_body = json.loads(json.loads(result.decode())['body']['hashtags'])




    return {
         "headers": { 
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'statusCode': 200,
        'body': json.dumps({"hashtags": remove_duplicate(result_body)}),
        "isBase64Encoded": False
    }

    # if (invoke_response == None):
    #     return {
    #     "statusCode": 200,
    #     "body": json.dumps({
    #         "message" : "ERROR! Cannot generate null tweet, please try again",
    #     }),
    # }

    # if (len(invoke_response) <= 0):
    #     return {
    #     "statusCode": 200,
    #     "body": json.dumps({
    #         "message" : "Cannot generate any hashtags, please try again",
    #     }),
    # }

    # return {
    #     "statusCode": 200,
    #     "body": {
    #         "hashtags":json.dumps(invoke_response)
    #     }
    # }