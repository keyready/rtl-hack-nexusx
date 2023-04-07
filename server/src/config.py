import os

class Config(object):
    SECRET_KEY='qc8BhapYxRGr5gLrX-x2K9bbGXHtmhlgiPhK1PT_w6,EMvTv3n'

    SQLALCHEMY_DATABASE_URI='postgresql://postgres:postgres@localhost:5432/rlt'# <- CHANGE THIS
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    #TODO Конфиги json
    JSONIFY_PRETTYPRINT_REGULAR = False
    JSON_SORT_KEYS = False
    JSON_AS_ASCII = False

