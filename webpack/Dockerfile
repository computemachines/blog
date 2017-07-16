FROM alpine

RUN apk update && apk add nodejs nodejs-npm
RUN mkdir -pv /webpack/
ADD blog/ /webpack/blog/

RUN cd /webpack/blog/; /usr/bin/node \
  --max_semi_space_size=1 \
  --max_old_space_size=198 \
  --max_executable_size=148 \
  /usr/bin/npm install
VOLUME /assets

CMD webpack --config /webpack/blog/webpack.config.js