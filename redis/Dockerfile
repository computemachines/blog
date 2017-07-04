FROM alpine

RUN apk update && apk add redis
RUN mkdir -pv /etc/redis.d/
ADD redis.conf /etc/redis.d/

CMD redis-server /etc/redis.d/redis.conf