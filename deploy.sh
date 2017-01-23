#! /bin/bash

git pull

rm -rfv /var/www/computemachines/
mkdir -pv /var/www/computemachines/
cp -rv /root/blog/computemachines/static/ /var/www/computemachines/
cp -v /root/blog/site-computemachines.com.conf /etc/nginx/sites-available/

nginx -s reload
touch /tmp/reload_uwsgi
