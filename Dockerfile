FROM node:22-bullseye

WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm install

ENV NEXT_PUBLIC_API_URL=http://localhost:8000

ENV NEXT_PUBLIC_BACKEND_ENDPOINT=http://gateway:8000

EXPOSE 3000

CMD ["npm", "run", "dev"]
