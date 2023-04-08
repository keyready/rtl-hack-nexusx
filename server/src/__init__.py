from src import vendor, customer, task
from flask import Flask
from flask_cors import CORS
from src.models import db

app = Flask(__name__)
app.config.from_object('src.config.Config')

cors = CORS(app)
db.init_app(app)
