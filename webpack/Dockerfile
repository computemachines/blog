FROM alpine

RUN apk update && apk add nodejs nodejs-npm
RUN mkdir -pv /webpack/
ADD blog/ /webpack/blog/

RUN cd /webpack/blog/; \
    npm install babel-core && \
    npm install babel-loader && \
    npm install babel-preset-es2015 && \
    npm install css-loader && \
    npm install file-loader && \
    npm install imports-loader && \
    npm install jquery && \
    npm install lodash && \
    npm install mathjax && \
    npm install snapsvg && \
    npm install style-loader && \
    npm install webpack && \
    npm install webpack-dev-server

    
VOLUME /assets

CMD webpack --config /webpack/blog/webpack.config.js