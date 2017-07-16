FROM alpine

RUN apk update && apk add nodejs
RUN mkdir -pv /webpack/
ADD blog/ /webpack/
RUN cd /webpack/blog/; npm install
VOLUME /assets

CMD webpack --config /webpack/blog/webpack.config.js