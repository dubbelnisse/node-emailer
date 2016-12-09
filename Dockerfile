FROM node:6.3

WORKDIR /app

RUN touch .env

ADD package.json /app/package.json
RUN npm install

ADD ./.eslintrc /app/.eslintrc
ADD ./lib /app/lib

CMD npm start
