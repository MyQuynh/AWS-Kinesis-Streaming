# from boto3 import client as boto3_client
# from datetime import datetime
# import json

# lambda_client = boto3_client('lambda', 'us-east-2')

# def remove_duplicate(arr):
#     mylist = list(dict.fromkeys(arr))
#     return mylist

# def lambda_handler(event, context):

#     print("Event")
#     print(event)

#     # msg = json.loads(event['body'])
    
#     # print(msg)
    

#     invoke_response = lambda_client.invoke(FunctionName="kinesis-InvokeGetTextPredictFunction-yBHi35nD3cxB",
#                                            InvocationType='RequestResponse',
#                                            Payload=json.dumps(event))

    
#     # print('Invoke respond')
    
#     # print(invoke_response['Payload'].read())
    
#     result = invoke_response['Payload'].read()
    
#     result_body = json.loads(result.decode())['body']
    
#     print("result")
    
#     print(result_body)
    
#     print("result")

#     return {
#         "headers": { 
#           'Content-Type': 'application/json',
#           'Access-Control-Allow-Origin': '*',
#            'Access-Control-Allow-Methods': '*'
#         },
#         'statusCode': 200,
#         'body': json.dumps(json.loads(result_body)),
#         "isBase64Encoded": False
#     }
