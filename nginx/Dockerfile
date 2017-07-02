FROM alpine
EXPOSE 80 443
# bind volume /etc/letsencrypt

RUN apk update && apk add nginx
ADD nginx.conf /etc/nginx/nginx.conf
ADD ../computemachines/static/ /data/static
CMD nginx -t && nginx -s reload

