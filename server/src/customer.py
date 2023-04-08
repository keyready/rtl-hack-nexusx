from flask import (
    abort,
    request,
    make_response,
    jsonify
)

from src import app
from src.models import db, Customer

from src.utils.customer import (
    check_customer_in_db,
    generate_access_token_for_customer
)


@app.route('/register_customer', methods=['POST'])
def register_customer():
    try:
        if request.method == 'POST':
            body = request.get_json()

            if not check_customer_in_db(body['email']):

                customer = Customer(
                    firstname=body['customer'],
                    firstname=body['firstname'],
                    middlename=body['middlename'],
                    lastname=body['lastname'],
                    password=body['password'],
                    image=body['image'],
                    email=body['email'],
                    avatar=body['avatar'],
                    solvedTasks=body['solvedTasks'],
                    activeTask=body['activeTask'],
                    achievements=body['achievements'],
                    activeBadge=['activeBadge'],
                    isVip=['isVip'],
                    experience=['experience'],
                    level=['level'],
                    balance=['balance']
                )

                db.session.add(customer)
                db.session.commit()

                return jsonify(message='Регистрация заказчика {} успешна.'.format(customer.email))
            else:
                abort(404)
    except:
        abort(500)


@app.route('/login_customer', methods=['POST'])
def login_customer():
    try:
        if request.method == 'POST':
            body = request.get_json()

            if check_customer_in_db(body['email']):
                token = generate_access_token_for_customer(
                    {'id': body['email']})
                response = make_response(
                    jsonify(message='Покупатель {} успешно авторизовался.'.format()))
                response.set_cookie('access_token', token, 3600)
                return response
    except:
        abort(500)


@app.route('/logout_customer', methods=['GET'])
def logout_customer():
    try:
        response = make_response(
            jsonify(message='Покупатель вышел из системы'))
        response.set_cookie('access_token', '', 0)
        return response
    except:
        abort(500)
