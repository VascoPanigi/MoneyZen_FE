FROM node:20
WORKDIR /app
# COPY ./backend/package.json ./

COPY ./package.json ./
RUN npm install 
RUN npm i -g serve
COPY . ./

RUN npm run build

EXPOSE 3000
CMD [ "serve", "-s", "dist"]