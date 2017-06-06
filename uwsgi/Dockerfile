FROM alpine

RUN mkdir -pv /data/www/
ADD hello.py /data/www/
RUN apk update && apk add python py-pip uwsgi-python
RUN pip install Flask
ENV FLASK_APP=/data/www/hello.py

CMD cd /data/www/; uwsgi --plugin python -s 0.0.0.0:3031 --manage-script-name --mount /=hello:app
