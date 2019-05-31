FROM node:10.2.1

ENV APP_PATH /opt/random-lol-champion/backend
WORKDIR $APP_PATH

COPY package.json package-lock.json $APP_PATH/
RUN npm install

COPY . $APP_PATH/

# El puerto en el que funciona la aplicación
EXPOSE 3000 

CMD ["npm", "run", "start"]
