FROM alpine
EXPOSE 80 443

RUN mkdir /etc/letsencrypt
VOLUME /etc/letsencrypt
RUN apk update && apk add certbot
CMD certbot certonly --standalone renew
