from flask import (
    request,
    jsonify,
    abort
)

import logging

from src import app
from src.models import db,Task

from src.utils.task import (
    check_task_in_db,
    secure_filename    
)

from src.utils.decorators import token_required

@app.route('/create_task',methods=['POST'])
@token_required
def create_task(user_data):
    if user_data['role'] == 'admin':
        try:
            if request.method == 'POST':
                body=request.get_json()
                image=request.files['image']

                if not check_task_in_db(title=body['title']):
                    task=Task(
                        title=body['title'],
                        description=body['description'],
                        image=app.config['UPLOAD_FODER']+'/{}'.format(secure_filename(image.filename))
                        )
                    
                    image.save(task.image)

                    db.session.add(task)
                    db.session.commit()

            logging.info('Задание {} успешно добавлено.'.format(task.title))
            return jsonify(message='Задание {} успешно добавлено.'.format(task.title))
        except:
            abort(500)
    else:
        abort(401)

@app.route('/delete_task',methods=['POST'])
@token_required
def delete_task(user_data):
    if user_data['role'] == 'admin':
        try:
            if request.method == 'POST':
                #TODO Массив id тасков, которые нужно удалить.
                ids=list(map(int,request.json['ids']))
                Task.query.filter(Task.id.in_(ids)).delete()
                db.session.commit()
                logging.info('Задания {} успешно удалены.'.format(ids))
                return jsonify(message='Задания {} успешно удалены.'.format(ids))
        except:
            abort(500)
    else:
        abort(401)

