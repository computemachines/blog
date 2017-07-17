# Reminders to future self

``` shell
openssl dhparam -out /etc/ssl/certs/dhparam.pem
```

## Order of docker spin up
1) uwsgi
2) nginx
3) webpack (terminates)



## Docker state
### Data Volumes

| Container | Volume |
|-----------|--------|
| letsencrypt | /etc/letsencrypt/ |
| nginx | /etc/letsencrypt/ /etc/ssl/ /assets/ |
| webpack | /assets/ |
| uwsgi | - |
| redis | - |

### Networking

| Container | Network | Exposed Bridged ports |
| -------- | ------------ | ------------------- |
| letsencrypt |  | 80 443 |
| nginx | blog | 80 443 |
| webpack |  | |
| uwsgi | blog | |
| redis | blog | |


* Letsencrypt certificate renewal
``` shell
docker run -ti -p 80:80 -p 443:443 -v /etc/letsencrypt/:/etc/letsencrypt letsencrypt
```

### Not included in this repo:
* letsencrypt.tar.gz
This archive contains the letsencrypt public and private keys, certs, and config. Unpack into /etc/ then renew certificate and optionally rebuild archive with fresh certs.

