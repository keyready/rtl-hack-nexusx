from flask import (
    request,
    abort,
    jsonify
)


from src import app
from src.models import db,Vendor

from src.utils.vendor import (
    check_vendor_in_db
)

@app.route('/register_vendor',methods=['POST'])
def register_vendor():
    try:
        if request.method == 'POST':
            body=request.get_json()
            if not check_vendor_in_db(body['name']):
                
                vendor=Vendor(
                    name=body['name'],
                    kpp=body['kpp'],
                    inn=body['inn'],
                )

                db.session.add(vendor)
                db.session.commit()

                return jsonify(message='Регистрация компании {} успешна.'.format(vendor.name)) 
    except:
        abort(500)
