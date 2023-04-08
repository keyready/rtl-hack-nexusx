from src.models import db,Vendor

def check_vendor_in_db(name):
    vendor=Vendor.query.filter_by(name=name).first()
    if vendor != None: return None
    else: return False