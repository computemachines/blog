FROM alpine

RUN mkdir -pv /data/www/
ADD hello.py /data/www/
RUN apk update && apk add uwsgi python
ENV FLASK_APP=/data/www/hello.py
