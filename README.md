# Ahorraton Front-End

This repo contains the full front-end for Ahorraton project developed as part of our final university project.

This project uses a micro-service architecture so most requests are made through our [Gateway](https://github.com/Ahorraton/gateway) which then communicates to the corresponding micro-service. You'll most likely need to open a few repos to understand a feature end-to-end.

## Running Locally

Please install all dependencies using `npm install`.

Run `npm run dev` and then open [http://localhost:3000](http://localhost:3000) with your browser to check out the front-end.

## Running in Dockerfile

If you have access to the full project docker-compose.yaml file, it's easier to build the full project using `sudo ./wake-up.sh`.
Make sure the script has the appropriate permissions.

Otherwise, run the following commands:

1. Create internal docker network

```
docker network create backend
```

__[Docker IPv6](https://docs.docker.com/engine/daemon/ipv6/) is only supported on Docker daemons running on Linux hosts.__

```
docker network create --ipv6 backend
```

2. Build the image

`docker build -t frontend -f Dockerfile .`

3. Run the image

`docker run -p 3000:3000 -v $(pwd):/app --network backend frontend`

Then open [http://localhost:3000](http://localhost:3000) with your browser to check out the front-end.

* Note
    - When we attach the volume `-v $(pwd):/app`, Docker overwrites the content inside the working directory 
    `/app`, with the content inside the volume. So it will use the local `node_modules` folder.
    - If you want docker to install these packages on a new container, run without this volume attachment. This will make the content static, so live updates will be lost.