FROM node:8.10-slim

ENV BACKEND_HOME /opt/hello-world-api

RUN mkdir $BACKEND_HOME
WORKDIR $BACKEND_HOME

COPY package.json package-lock.json $BACKEND_HOME/
RUN npm install

COPY . $BACKEND_HOME/

EXPOSE 3000

CMD ["npm", "run", "start"]

