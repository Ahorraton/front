FROM node:22-bullseye

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV GATEWAY_HOST=gateway
ENV GATEWAY_PORT=8000

EXPOSE 3000

CMD ["npm", "run", "dev"]
