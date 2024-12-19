# Ignore the Dark Public Code

**Live Demo**: [http://ignorethedark.com/](http://ignorethedark.com/)
 

This repository is created as a boilerplate for writing a complete web application with following stack; Remix, AWS and Cloudflare.
The code published here samples the web-site [ignorethedark.com](https://ignorethedark.com). Therefore, some parts of live demo may be excluded from the published source code.

# Table of contents:

- [Pre-reqs](#pre-reqs)
- [Getting started](#getting-started)
- [Deploying the app](#deploying-the-app)
	- [Docker deployment](#docker-deployment)

# Pre-reqs
To build and run this app locally you will need a few things:
- Install [Node.js](https://nodejs.org/en/) (> v20)

# Getting started
- Clone the repository
```
git clone --depth=1 https://github.com/omuryildirim/ignore-the-dark-public.git <project_name>
```
- Install dependencies
```
pnpm install
cd <project_name>/aws
pnpm install
pnpm dev
```

- Alternatively, you can just run the frontend application:

```bash
cd <project_name>/aws/remix
pnpm install
pnpm dev:remix
```

# Deploying the app
The project comes with GitHub actions to deploy both SST application to AWS and Cloudflare workers to Cloudflare.
In order to actions to work, you need to add secrets to your repository.

Alternatively, you can deploy the app manually.

```bash
cd <project_name>/aws
pnpm deploy	# Deploy the SST application to AWS

cd <project_name>/cloudflare/api-worker
pnpm deploy	# Deploy the api worker to Cloudflare

cd <project_name>/cloudflare/photography-worker
pnpm deploy	# Deploy the photography worker to Cloudflare

cd <project_name>/cloudflare/route-worker
pnpm deploy	# Deploy the route worker to Cloudflare
```
