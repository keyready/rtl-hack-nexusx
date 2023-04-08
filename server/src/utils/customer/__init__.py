from src.models import db,Customer

import jwt,os

def check_customer_in_db(email):
    #TODO Найти совпадение и исключить его по email, вернуть либо True, либо False
    pass

def generate_access_token_for_customer(payload):
    payload.update({'role':'user','status':'customer'})
    token=jwt.encode(payload,os.environ.get('JWT_ACCESS_SECRET_KEY'))
    return token