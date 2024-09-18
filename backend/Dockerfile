FROM node:20

WORKDIR /

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npx tsc

EXPOSE 5000

CMD ["node", "dist/src/server.js"]
