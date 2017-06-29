# Reminders to future self

* Letsencrypt certificate renewal
``` shell
docker run -ti -p 80:80 -p 443:443 -v /etc/letsencrypt/:/etc/letsencrypt letsencrypt
```

### Not included in this repo:
* letsencrypt.tar.gz
This archive contains the letsencrypt public and private keys, certs, and config. Unpack into /etc/ then renew certificate and optionally rebuild archive with fresh certs.

