FROM node:10.2.1 as builder

ENV APP_PATH /opt/SharedAuth/frontend
WORKDIR $APP_PATH

RUN apt-get update && \
    apt-get install -y \
    libgtk2.0-0 \
    libnotify-dev \
    libgconf-2-4 \
    libnss3 \
    libxss1 \
    libasound2 \
    xvfb

COPY package.json package-lock.json $APP_PATH/
RUN npm install
RUN npm rebuild node-sass --force

COPY . $APP_PATH/
RUN npm run build

EXPOSE 8080
CMD ["npm", "start"]

FROM nginx:1.15.1-alpine
COPY --from=builder /opt/SharedAuth/frontend/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]