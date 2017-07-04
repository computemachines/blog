FROM alpine

RUN apk update && apk add redis
RUN mkdir -pv /etc/redis/
ADD redis.conf /etc/redis/

CMD redis-server /etc/redis/redis.conf