from src.models import db,Task

from werkzeug.utils import secure_filename

def check_task_in_db(title):
    task=Task.query.filter_by(title=title).first()
    if task != None: return True
    else: return False