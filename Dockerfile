FROM registry.access.redhat.com/ubi9/nodejs-18
 
WORKDIR /app
 
COPY package.json package.json
COPY package-lock.json package-lock.json
 
RUN npm install
 
COPY . .

EXPOSE 80

CMD [ "node", "index.js" ]
