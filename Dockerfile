# build nodejs app
FROM node:13.3.0
RUN mkdir -p /usr/src/nodejs
WORKDIR /usr/src/nodejs
COPY ./nodejs /usr/src/nodejs/
RUN npm install
RUN npm run build

# build angular app
RUN mkdir -p /usr/src/angular
COPY ./angular /usr/src/angular/
RUN npm install
RUN npm run build

# copy photographies
COPY ./photography /usr/src/photography/

# run app
EXPOSE 3000
CMD ["npm", "start"]