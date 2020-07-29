### ../../../app01/Makefile 
```
ng1:
	npm install -g @angular/cli
	ng new frontend
ng2: 
	cd frontend && ng serve
ng3:
	docker-compose -f docker-compose.dev.yml up	--build
ng4:
	docker-compose -f docker-compose.dev.yml down	

```
### ../../../app01/docker-compose.dev.yml 
```
version: "3.8" # specify docker-compose version

# Define the services/containers to be run
services:
  angular: # name of the first service
    build: # specify the directory of the Dockerfile
      context: ./frontend
      dockerfile: Dockerfile.dev
    container_name: cook_angular
    volumes:
      - ./frontend:/frontend
      - /frontend/node_modules
    ports:
      - "4200:4200" # specify port forewarding
      - "49153:49153"
    environment:
      - NODE_ENV=dev

#  express: #name of the second service
#    build: # specify the directory of the Dockerfile
#      context: ./api
#      dockerfile: debug.dockerfile
#    container_name: mean_express
#    volumes:
#      - ./api:/api
#      - /api/node_modules
#    ports:
#      - "3000:3000" #specify ports forewarding
#    environment:
#      - SECRET=Thisismysecret
#      - NODE_ENV=development
#      - MONGO_DB_USERNAME=admin-user
#      - MONGO_DB_PASSWORD=admin-password
#      - MONGO_DB_HOST=database
#      - MONGO_DB_PORT=
#      - MONGO_DB_PARAMETERS=?authSource=admin
#      - MONGO_DB_DATABASE=mean-contacts
#    links:
#      - database
#
#  database: # name of the third service
#    image: mongo # specify image to build container from
#    container_name: mean_mongo
#    environment:
#      - MONGO_INITDB_ROOT_USERNAME=admin-user
#      - MONGO_INITDB_ROOT_PASSWORD=admin-password
#      - MONGO_DB_USERNAME=admin-user1
#      - MONGO_DB_PASSWORD=admin-password1
#      - MONGO_DB=mean-contacts
#
#    volumes:
#      - ./mongo:/home/mongodb
#      - ./mongo/init-db.d/:/docker-entrypoint-initdb.d/
#      - ./mongo/db:/data/db
#    ports:
#      - "27017:27017" # specify port forewarding

```
### ../../../app01/frontend/package.json 
```
{
  "name": "frontend",
  "version": "0.0.0",
  "scripts": {
    "ng": "ng",
    "start": "ng serve --disableHostCheck=true --host=0.0.0.0 ",
    "build": "ng build",
    "test": "ng test",
    "lint": "ng lint",
    "e2e": "ng e2e"
  },
  "private": true,
  "dependencies": {
    "@angular/animations": "~10.0.5",
    "@angular/common": "~10.0.5",
    "@angular/compiler": "~10.0.5",
    "@angular/core": "~10.0.5",
    "@angular/forms": "~10.0.5",
    "@angular/platform-browser": "~10.0.5",
    "@angular/platform-browser-dynamic": "~10.0.5",
    "@angular/router": "~10.0.5",
    "rxjs": "~6.5.5",
    "tslib": "^2.0.0",
    "zone.js": "~0.10.3"
  },
  "devDependencies": {
    "@angular-devkit/build-angular": "~0.1000.4",
    "@angular/cli": "~10.0.4",
    "@angular/compiler-cli": "~10.0.5",
    "@types/node": "^12.11.1",
    "@types/jasmine": "~3.5.0",
    "@types/jasminewd2": "~2.0.3",
    "codelyzer": "^6.0.0",
    "jasmine-core": "~3.5.0",
    "jasmine-spec-reporter": "~5.0.0",
    "karma": "~5.0.0",
    "karma-chrome-launcher": "~3.1.0",
    "karma-coverage-istanbul-reporter": "~3.0.2",
    "karma-jasmine": "~3.3.0",
    "karma-jasmine-html-reporter": "^1.5.0",
    "protractor": "~7.0.0",
    "ts-node": "~8.3.0",
    "tslint": "~6.1.0",
    "typescript": "~3.9.5"
  }
}

```
### ../../../app01/frontend/Dockerfile.dev 
```
# Create image based off of the official 12.8-alpine
FROM node:14-alpine

# disabling ssl for npm for Dev or if you are behind proxy
RUN npm set strict-ssl false
#RUN echo "nameserver 8.8.8.8" |  tee /etc/resolv.conf > /dev/null

WORKDIR /frontend

# Copy dependency definitions
COPY package.json ./

## installing and Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN npm i

COPY . .

EXPOSE 4200 49153

CMD ["npm", "start"]

```
