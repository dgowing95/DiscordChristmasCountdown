FROM node:13.8
WORKDIR /home/app
COPY . .
CMD npm run start
