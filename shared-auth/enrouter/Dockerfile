FROM node:10.2.1

ENV APP_PATH /opt/SharedAuth/enrouter
WORKDIR $APP_PATH

COPY package.json package-lock.json $APP_PATH/
RUN npm install

COPY . $APP_PATH/

# El puerto en el que funciona la aplicación
EXPOSE 4000

CMD ["npm", "run", "start"]
