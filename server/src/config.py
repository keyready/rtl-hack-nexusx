import os

class Config(object):
    SECRET_KEY='qc8BhapYxRGr5gLrX-x2K9bbGXHtmhlgiPhK1PT_w6,EMvTv3n'

    SQLALCHEMY_DATABASE_URI='postgresql://k0fanov36:k0fanov36@localhost:5432/rlt'# <- CHANGE THIS
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    UPLOAD_FOLDER='/server/src/static/img'

    ############ Конфиги json #########
    JSONIFY_PRETTYPRINT_REGULAR = False
    JSON_SORT_KEYS = False
    JSON_AS_ASCII = False

    ############ Конфиги JWT ###########
    JWT_ACCESS_SECRET_KEY=os.environ('JWT_ACCESS_SECRET_KEY','')


