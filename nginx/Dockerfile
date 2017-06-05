FROM alpine
EXPOSE 80 443
# bind volume /etc/letsencrypt

RUN apk update && apk add nginx
ADD nginx.conf /etc/nginx/nginx.conf
RUN nginx -t
CMD nginx -s reload

