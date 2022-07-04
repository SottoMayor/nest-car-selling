FROM node:16

WORKDIR /app

COPY package.json .

RUN npm install -g npm@8.13.2
RUN npm install -g cross-env
RUN npm install --force

COPY . .

RUN npm run build

EXPOSE 80

CMD ["npm", "run", "start"]