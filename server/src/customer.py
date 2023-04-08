from flask import (
    abort,
    request,
    make_response,
    jsonify
)

from src import app
from src.models import db,Customer

from src.utils.customer import (
    check_customer_in_db,
    generate_access_token_for_customer
)

@app.route('/register_customer',methods=['POST'])
def register_customer():
    try:
        if request.method == 'POST':
            body=request.get_json()

            if not check_customer_in_db(body['email']):
                customer=Customer(
                    firstname=body['customer'],
                    #TODO дозаполнить объект и добавить его в БД.
                )
                return jsonify(message='Регистрация заказчика {} успешна.'.format(customer.email))
            else:
                abort(404)
    except:
        abort(500)

@app.route('/login_customer',methods=['POST'])
def login_customer():
    try:
        if request.method == 'POST':
            body=request.get_json()

            if check_customer_in_db(body['email']):
                customer=Customer(
                    firstname=body['firstname'],
                    #TODO Дозаполнить объект, добавить в бд и сохранить.
                )

                token=generate_access_token_for_customer({'id':customer['id']})
                response=make_response(jsonify(message='Покупатель {} успешно авторизовался.'.format(customer.email)))
                response.set_cookie('access_token',token,3600)
                return response
    except:
        abort(500)

@app.route('/logout_customer',methods=['GET'])
def logout_customer():
    try:
        response=make_response(jsonify(message='Покупатель вышел из системы'))
        response.set_cookie('access_token','',0)
        return response
    except:
        abort(500)