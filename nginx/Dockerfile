FROM alpine
EXPOSE 80 443
VOLUME /etc/letsencrypt

RUN apk update && apk add nginx
ADD nginx.conf /etc/nginx/nginx.conf
# static must be copied from ../computemachines/static
ADD static/ /data/static
CMD nginx -t && nginx -g "daemon off;"

