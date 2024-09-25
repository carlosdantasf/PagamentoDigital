FROM node:20-alpine3.19
ENV NODE_ENV=production
WORKDIR /app

COPY package*.json ./

#RUN npm ci --silent
RUN npm install
COPY . ./
RUN npm install -g nodemon

EXPOSE 3030
#CMD ["npm","cross-prod"]
CMD ["nodemon", "-w", "src", "-e","ts","--exec", "npx ts-node src/server.ts"]



