# Reminders to future self

``` shell
openssl dhparam -out /etc/ssl/certs/dhparam.pem
```

* Letsencrypt certificate renewal
``` shell
docker run -ti -p 80:80 -p 443:443 -v /etc/letsencrypt/:/etc/letsencrypt letsencrypt
```
* NGINX production
``` shell
docker run -tid -p 80:80 -p 443:443 -v /etc/letsencrypt/:/etc/letsencrypt -v /etc/ssl/:/etc/ssl/ --net=blog --name=nginx nginx nginx -g "daemon off;"
```
* NGINX development
``` shell
sudo docker run --rm -tid -p 80:80 -p 443:443 --net=blog --name=nginx -v /etc/self-cert/live/:/etc/letsencrypt/live/ -v /etc/self-cert/:/etc/self-cert/ -v /etc/ssl/:/etc/ssl nginx nginx -g "daemon off;"
```

### Not included in this repo:
* letsencrypt.tar.gz
This archive contains the letsencrypt public and private keys, certs, and config. Unpack into /etc/ then renew certificate and optionally rebuild archive with fresh certs.

