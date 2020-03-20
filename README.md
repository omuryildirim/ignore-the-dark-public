# Ignore the Dark Public Code

**Live Demo**: [http://ignorethedark.com/](http://ignorethedark.com/)
 

The main purpose of this repository is to show a good end-to-end project setup and workflow for writing a complete web application with following stack; Node.js, mongodb, Angular.
The code published here samples the web-site ignorethedark.com. Therefore, some parts on live demo can be excluded from the given source code.

# Table of contents:

- [Pre-reqs](#pre-reqs)
- [Getting started](#getting-started)
- [Deploying the app](#deploying-the-app)
	- [Docker deployment](#docker-deployment)

# Pre-reqs
To build and run this app locally you will need a few things:
- Install [Node.js](https://nodejs.org/en/)
- Install [MongoDB](https://docs.mongodb.com/manual/installation/)

# Getting started
- Clone the repository
```
git clone --depth=1 https://github.com/omuryildirim/ignore-the-dark-public.git <project_name>
```
- Install dependencies
```
cd <project_name>/angular
npm install
npm run build
cd ../nodejs
npm install
```
- Configure your mongoDB server
```bash
# create the db directory
sudo mkdir -p /data/db
# give the db correct read/write permissions
sudo chmod 777 /data/db

# starting from macOS 10.15 even the admin cannot create directory at root
# so lets create the db diretory under the home directory.
mkdir -p ~/data/db
# user account has automatically read and write permissions for ~/data/db.
```
- Start your mongoDB server (you'll probably want another command prompt)
```bash
mongod

# on macOS 10.15 or above the db directory is under home directory
mongod --dbpath ~/data/db
```
- Build and run the project
```
npm run build
npm start
```

# Deploying the app
There are many ways to deploy an Node app. Either you build it locally and upload the build folder to your server and serve it via Nginx or you can use docker and run your application inside a docker container.


## Docker deployment
- [**Docker install**](https://docs.docker.com/install/) - First follow instructions related to your environment and install docker.
- [**Docker compose install**](https://docs.docker.com/compose/install/) - Follow instructions related to your environment and install docker compose.

Deploy your code base to your server. Then build your application with docker compose.
```
cd <project_name>
sudo docker-compose build
```

After building docker container, run it via docker compose in desired port.
```
sudo docker-compose run -p 3000:3000 -d app
```
