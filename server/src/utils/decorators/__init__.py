from flask import (
    abort,
    request,
)

import jwt,os

from functools import wraps

def token_required(f):
    @wraps(f)
    def decorator(*args,**kwargs):
        token=None
        if 'access_token' not in request.cookies:
            abort(401)
        token=request.cookies['access_token']

        if len(token.split('.')) != 3:
            abort(401)
        
        try:
            user_data=jwt.decode(token,os.environ.get('JWT_ACCESS_SECRET_KEY'))
        except:
            abort(401)

        return f(user_data,*args,**kwargs)
    
    return decorator