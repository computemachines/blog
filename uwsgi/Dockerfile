FROM alpine

RUN mkdir -pv /data/www/
ADD hello.py /data/www/
RUN apk update && apk add uwsgi python py-pip
RUN pip install Flask
ENV FLASK_APP=/data/www/hello.py
