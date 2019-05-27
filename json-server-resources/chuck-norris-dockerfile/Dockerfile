FROM node:12.2-slim

RUN mkdir /opt/chucknorris
WORKDIR /opt/chucknorris

COPY chuck-norris.json .

RUN npm install -g json-server

EXPOSE 3000

CMD json-server --watch chuck-norris.json --host 0.0.0.0
