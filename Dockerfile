FROM node:16.16.0-alpine AS build

RUN apk update && apk add --update --no-cache make
COPY ./ /app
WORKDIR /app
RUN set -xe && make install
CMD ["make", "start"]