FROM python:3.10

RUN mkdir -p /backend 
COPY . /backend
WORKDIR /backend

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

ENV FLASK_APP src/__init__.py

RUN pip install --upgrade pip && pip install -r requirements.txt

