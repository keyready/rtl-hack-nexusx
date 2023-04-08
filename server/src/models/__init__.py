from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import *
from sqlalchemy.orm import relationship

db=SQLAlchemy()

def object_as_dict(obj):
    return {c.key: getattr(obj, c.key) for c in inspect(obj).mapper.column_attrs}

customers_achievements = db.Table("customers_achievements",
                                db.Column('id',db.Integer,primary_key=True),
                                db.Column('achievement_id', db.Integer, db.ForeignKey('achievements.id')),
                                db.Column('customer_id', db.Integer, db.ForeignKey('customers.id'))
                            )

class Achievement(db.Model):
    __tablename__ = "achievements"
    
    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String, nullable = False)
    description = db.Column(db.String, nullable = False)
    image = db.Column(db.String, nullable = False)
    userRate = db.Column(db.Integer)
    expConst =  db.Column(db.Integer)
    coinsConst = db.Column(db.Integer)
    
    def __init__(self, title, description, image, userRate, expConst, coinsConst):
        self.title = title
        self.description = description
        self.image = image
        self.userRate = userRate
        self.expConst = expConst
        self.coinsConst = coinsConst 
            
    def __repr__(self):
        return "<Achievement %c>" % self.id
    
class Task(db.Model):
    __tablename__ = "tasks"

    id = db.Column(db.String, primary_key = True)
    title = db.Column(db.String, nullable = False)
    description = db.Column(db.String, nullable = False)
    image = db.Column(db.String, nullable = False)
    expConst =  db.Column(db.Integer)
    coinsConst = db.Column(db.Integer)
    
    def __init__(self, title, description, image, expConst, coinsConst):
        self.title = title
        self.description = description
        self.image = image
        self.expConst = expConst
        self.coinsConst = coinsConst 
            
    def __repr__(self):
        return "<Task %c>" % self.id
    
class Admin(db.Model):
    __tablename__ = "admins"

    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String, nullable = False)
    password = db.Column(db.String, nullable = False)
    
    def __init__(self, username, password):
        self.username = username
        self.password = password
        
    def __repr__(self):
        return "<Admin %c>" % self.id
    
class Customer(db.Model):
    __tablename__ = "customers"
    
    id = db.Column(db.Integer, primary_key = True)
    firstname = db.Column(db.String, nullable = False)
    middlename = db.Column(db.String, nullable = False)
    lastname = db.Column(db.String, nullable = False)
    password = db.Column(db.String, nullable = False)
    image = db.Column(db.String, nullable = False)
    email = db.Column(db.String, nullable = False,unique=True)
    avatar = db.Column(db.String, nullable = False)
    solvedTasks = db.Column(db.ARRAY(db.Integer))
    activeTask = db.Column(db.Integer)
    activeBadge = db.Column(db.Integer)
    isVip = db.Column(db.Integer)
    experience = db.Column(db.Integer)
    level= db.Column(db.Integer)
    balance= db.Column(db.Integer)

    achievements = db.relationship('Achievement', secondary=customers_achievements, backref='posts')
    
    def __init__(self, firstname, middlename, lastname, password, image, email, avatar, solvedTasks, activeTask, achievements, activeBadge, isVip, experience, level, balance):       
        self.firstname =firstname
        self.middlename = middlename
        self.lastname = lastname
        self.password = password
        self.image = image
        self.email = email
        self.avatar = avatar
        self.solvedTasks = solvedTasks
        self.activeTask = activeTask
        self.achievements = achievements
        self.activeBadge = activeBadge
        self.isVip = isVip
        self.experience = experience 
        self.level = level
        self.balance = balance

    def __repr__(self):
        return "<Customer %c>" % self.id

class Vendor(db.Model):
    __tablename__='vendors'

    id=db.Column(db.Integer,primary_key=True)
    name=db.Column(db.String,nullable=False,unique=True)
    inn=db.Column(db.String,nullable=False,unique=True)
    kpp=db.Column(db.String,nullable=False,unique=True)

    def __init__(self,name,inn,kpp):
        self.name = name
        self.inn = inn
        self.kpp = kpp

    def __repr__(self):
        return '<Vendor %v>' % self.name