from flask import (
    request,
    abort,
    jsonify
)

from src import app

from src.models import db,Task

from src.utils.decorators import token_required
from src.utils.task import convert_to_json


@app.route('/tasks',methods=['GET'])
@token_required
def tasks():
    try:
        tasks=Task.query.all()
        jsonTasks=convert_to_json(tasks)
        return jsonify(jsonTasks)
    except:
        abort(500)


