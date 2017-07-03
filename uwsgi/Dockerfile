FROM alpine

RUN mkdir -pv /data/www/
ADD hello.py /data/www/
ADD blogapp.ini /etc/uwsgi/conf.d/
RUN apk update && apk add python3 uwsgi-python3
RUN pip3 install Flask

CMD cd /data/www/; uwsgi --ini /etc/uwsgi/conf.d/blogapp.ini

