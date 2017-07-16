FROM alpine

RUN apk update && apk add nodejs nodejs-npm
RUN mkdir -pv /webpack/
ADD blog/ /webpack/blog/
RUN cd /webpack/blog/; npm install
VOLUME /assets

CMD webpack --config /webpack/blog/webpack.config.js