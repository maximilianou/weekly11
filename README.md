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
### ../../../app02/frontend/src/app/app.module.ts 
```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';

import { FormsModule } from '@angular/forms';
import { DishDetailComponent } from './dish-detail/dish-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DishDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```
### ../../../app02/frontend/src/app/app.component.ts 
```
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Cooking !!!';
}

```
### ../../../app02/frontend/src/app/app.component.html 
```
<h1>{{title}}</h1>
<app-menu></app-menu>
<router-outlet></router-outlet>

```
### ../../../app02/frontend/src/app/dish.ts 
```
export interface Dish {
    id: number;
    name: string;
}
```
### ../../../app02/frontend/src/app/mock-dishes.ts 
```
import { Dish } from './dish';

export const DISHES : Dish[] = [
    { id: 11, name: 'Lasagna' },
    { id: 12, name: 'Parmesana' },
    { id: 13, name: 'Ravioli' },
    { id: 14, name: 'Spaguetti' },
    { id: 15, name: 'Milanesa' },
    { id: 16, name: 'Risotto' },
    { id: 17, name: 'Soup' },
]
```
### ../../../app02/frontend/src/app/menu/menu.component.ts 
```
import { Component, OnInit } from '@angular/core';
import { Dish } from '../dish';
import { DISHES } from '../mock-dishes';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  dishes = DISHES;
  selectedDish: Dish;
  constructor() { }

  ngOnInit(): void {
  }

  onSelect(dish: Dish): void{
    this.selectedDish = dish;
  }
}

```
### ../../../app02/frontend/src/app/menu/menu.component.html 
```
<h2>Menu</h2>
<ul class="menu">
  <li *ngFor="let dish of dishes"
    [class.selected]="dish === selectedDish"
    (click)="onSelect(dish)"> 
  <span>id:</span>{{dish.id}}
  <span>name:</span>{{dish.name}}
  </li>
</ul>
<app-dish-detail [dish]="selectedDish"></app-dish-detail>

```
### ../../../app02/frontend/src/app/dish-detail/dish-detail.component.ts 
```
import { Component, OnInit, Input } from '@angular/core';
import { Dish } from '../dish';

@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.component.html',
  styleUrls: ['./dish-detail.component.css']
})
export class DishDetailComponent implements OnInit {

  @Input() dish : Dish;

  constructor() { }

  ngOnInit(): void {
  }

}

```
### ../../../app02/frontend/src/app/dish-detail/dish-detail.component.html 
```
<div *ngIf="dish">
    <h2>{{ dish.name | uppercase }} Details</h2>
    <div><span>id:</span>{{dish.id}}</div>
    <div>
      <label>name:
        <input [(ngModel)]="dish.name" placeholder="dish.name" />
      </label>
    </div>
  </div>
  
```
