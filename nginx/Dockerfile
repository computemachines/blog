FROM alpine
EXPOSE 80 443
VOLUME /assets/

RUN apk update && apk add nginx
ADD nginx.conf /etc/nginx/nginx.conf
RUN nginx -t

CMD nginx -g "daemon off;"

