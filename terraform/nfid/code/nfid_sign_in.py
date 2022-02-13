import json
import logging
import requests
import os
import boto3
import uuid
import hashlib

logger = logging.getLogger()
logger.setLevel(logging.INFO)


def lambda_handler(event, context):

    print(event)

    client_id = os.environ.get("CLIENT_ID")
    client_secret = os.environ.get("CLIENT_SECRET")
    redirect_uri = os.environ.get("REDIRECT_URI")

    code = event["queryStringParameters"]["code"]

    auth_response = requests.post(
        "https://api.coinbase.com/oauth/token",
        params={
            "grant_type": "authorization_code",
            "code": code,
            "client_id": client_id,
            "client_secret": client_secret,
            "redirect_uri": redirect_uri,
        },
    )

    uid = auth_response["data"]["id"]
    email = auth_response["data"]["email"]

    salt = uuid.uuid4().hex
    nfid = hashlib.sha512(uid + salt).hexdigest()

    dynamodb = boto3.client("dynamodb")

    put_response = dynamodb.put_item(
        TableName="nfid_dynamodb",
        Item={
            "nfid": {"S": nfid},
            "email": {"S": email},
            "salt": {"S": salt},
        },
    )

    return {"statusCode": 200, "body": json.dumps("Hello from Lambda!")}
