#! /bin/bash

nginx_development="echo docker run --rm -tid -p 80:80 -p 443:443 --net=blog --name=nginx -v /assets/ -v /etc/self-cert/live/:/etc/letsencrypt/live/ -v /etc/self-cert/:/etc/self-cert/ -v /etc/ssl/:/etc/ssl nginx nginx"

nginx_production="echo docker run -tid -p 80:80 -p 443:443 -v /etc/letsencrypt/:/etc/letsencrypt -v /assets/ -v /etc/ssl/:/etc/ssl/ --net=blog --name=nginx nginx nginx"

uwsgi="docker run --rm -tid --net=blog --name=uwsgi uwsgi"

webpack="docker run --rm -ti --volumes-from nginx --name webpack webpack"

if [ "$1" = "dev" ]; then
    echo "development nginx"
    echo $nginx_development
    $nginx_development
else
    echo "production nginx"
    echo $nginx_production
    $nginx_production
fi

echo $uwsgi
$uwsgi

echo $webpack
$webpack
