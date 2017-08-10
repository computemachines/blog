FROM alpine

RUN apk update && apk add nodejs nodejs-npm
RUN mkdir -pv /webpack/
ADD blog/ /webpack/blog/

RUN cd /webpack/blog/; \
    npm install @computemachines/subdivision && \
    npm install autoprefixer && \
    npm install babel-cli && \
    npm install babel-core && \
    npm install babel-loader && \
    npm install babel-preset-es2015 && \
    npm install babel-register && \
    npm install bootstrap && \
    npm install chai && \
    npm install css-loader && \
    npm install exports-loader && \
    npm install extract-text-webpack-plugin@2.1.2 && \
    npm install file-loader && \
    npm install imports-loader && \
    npm install jquery && \
    npm install karma && \
    npm install karma-babel-preprocessor && \
    npm install karma-chai && \
    npm install karma-chrome-launcher && \
    npm install karma-mocha && \
    npm install karma-mocha-reporter && \
    npm install karma-webpack && \
    npm install locate-path && \
    npm install lodash && \
    npm install mathjax && \
    npm install mocha && \
    npm install node-sass && \
    npm install postcss-loader && \
    npm install resolve-url-loader && \
    npm install sass-loader && \
    npm install snapsvg && \
    npm install style-loader && \
    npm install url-loader && \
    npm install webpack && \
    npm install webpack-dev-server 

VOLUME /assets

CMD cd /webpack/blog; npm run build