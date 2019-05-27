FROM node:8.11.3-alpine

ENV APP_PATH /opt/SharedAuth/stub
WORKDIR $APP_PATH

COPY package.json package-lock.json $APP_PATH/
RUN npm install

COPY . $APP_PATH/

EXPOSE 3001

CMD ["npm", "start"]
