from src.models import db,Task

from werkzeug.utils import secure_filename
from src.models import object_as_dict

def convert_to_json(arr):
    result=[]
    for elem in arr:
        result.append(object_as_dict(elem))
    return result

def check_task_in_db(title):
    task=Task.query.filter_by(title=title).first()
    if task != None: return True
    else: return False