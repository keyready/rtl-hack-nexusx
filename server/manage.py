from flask.cli import FlaskGroup
from sqlalchemy_utils import database_exists
from sqlalchemy import create_engine,inspect

from src import app
from src.models import db

import shutil,os,logging

cli=FlaskGroup(app)

@cli.command('create_db')
def create_db():

    engine=create_engine(app.config['SQLALCHEMY_DATABASE_URI'])
    inspector=inspect(engine)
    
    if not database_exists(app.config['SQLALCHEMY_DATABASE_URI']) or \
        len(inspector.get_table_names()) == 0:
        
        db.drop_all()
        db.create_all()
        db.session.commit()
        
        logging.info('[+] База данных успешно создана. \n Входные данные добавлены.')
        print('[+] База данных успешно создана. \n Входные данные добавлены.')
    
    else:
        logging.warning('[-] База данных на данный момент не пустая.')
        print('[-] База данных на данный момент не пустая.')
    
@cli.command('clear_db')
def clear_db():

    action=str(input('Вы действительно хотите полностью очистить Базу данных? Отменить данное действие будет невозможно. Д/Н: '))
    
    if action == 'Д':
        db.drop_all()
        db.session.commit()

        logging.info('[+] База данных полностью очищенна.')
        print('[+] База данных полностью очищенна.')
    
    elif action == 'Н':
        
        logging.info('[-] Отмена сброса Базы данных.')
        print('[-] Отмена сброса Базы данных.')

@cli.command('create_media')
def create_media():
    if 'img' not in os.listdir('/server/src/static/'):

        os.mkdir('/server/src/static/img')    
        
        print('[+] Директория для хранения фото успешно создана.')
        logging.info('[+] Директория для хранения фото успешно создана.')    
    else:
        print('[-] Директория хранения фото уже существует!')
        logging.warning('[-] Директория хранения фото уже существует!')



@cli.command('clear_media')
def clear_media():
    
    action=str(input('Вы действительно хотите удалить директорию хранения фото? Д/Н: '))
    
    if action == 'Д' and 'img' in os.listdir('/server/src/static/'):
        
        shutil.rmtree('/server/src/static/img/')
        
        print('[+] Директория хранения фото успешно удалена')
        logging.info('[+] Директория хранения фото успешно удалена')
    
    elif 'img' not in os.listdir('/server/src/static'):
        print('[-] Директория хранения фото еще не создана.')
        logging.warning('[-] Директория хранения фото еще не создана.')
    
    elif action == 'Н':
        print('[-] Отмена удаления медиа-контента.')
        logging.info('[-] Отмена удаления медиа-контента.')

if __name__ == '__main__':
    cli()