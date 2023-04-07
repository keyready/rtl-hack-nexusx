from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import *

db=SQLAlchemy()

def object_as_dict(obj):
    return {c.key: getattr(obj, c.key) for c in inspect(obj).mapper.column_attrs}

class Achievement(db.Model):
    id = db.Column(db.String, primary_key = True)
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
        return "<Customer %c>" % self.id
    
class Task(db.Model):
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
        return "<Customer %c>" % self.id
    
class Admin(db.Model):
    __tablename__ = "admins"
    id = db.Column(db.String, primary_key = True)
    username = db.Column(db.String, nullable = False)
    password = db.Column(db.String, nullable = False)
    
    def __init__(self, username, password):
        self.username = username
        self.password = password
        
    def __repr__(self):
        return "<Customer %c>" % self.id
     
           
class Customer(db.Model):
    __tablename__ = "customers"
    
    id = db.Column(db.String, primary_key = True)
    firstname = db.Column(db.String, nullable = False)
    middlename = db.Column(db.String, nullable = False)
    lastname = db.Column(db.String, nullable = False)
    password = db.Column(db.String, nullable = False)
    image = db.Column(db.String, nullable = False)
    email = db.Column(db.String, nullable = False)
    avatar = db.Column(db.String, nullable = False)
    solvedTasks = db.Column(db.ARRAY)
    activeTask = db.Column(db.Integer)
    achievements = db.Column(db.ARRAY)
    activeBadge = db.Column(db.Integer)
    isVip = db.Column(db.Integer)
    experience = db.Column(db.Boolean)
    level= db.Column(db.Integer)
    balance= db.Column(db.Integer)
    
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
    