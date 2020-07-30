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
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';

import { FormsModule } from '@angular/forms';
import { DishDetailComponent } from './dish-detail/dish-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { DishSearchComponent } from './dish-search/dish-search.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DishDetailComponent,
    MessagesComponent,
    DashboardComponent,
    DishSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```
### ../../../app02/frontend/src/app/app-routing.module.ts 
```
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DishDetailComponent } from './dish-detail/dish-detail.component';

const routes: Routes = [
  { path: 'menu', component: MenuComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: DishDetailComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

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
<nav>
    <a routerLink="/dashboard" >Dashboard</a>
    <a routerLink="/menu" >Menu</a>
</nav>
<router-outlet></router-outlet>
<app-messages></app-messages>

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
import { DishService } from '../dish.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  dishes: Dish[];

  constructor(
    private dishService: DishService) { }

  ngOnInit(): void {
    this.getDishes();
  }

  getDishes(): void{
    this.dishService.getDishes()
      .subscribe( dishes => this.dishes = dishes );
  }
  add(name: string): void {
    name = name.trim();
    if(!name){
      return;
    }else{
      this.dishService.addDish({name} as Dish)
      .subscribe(dish => {
        this.dishes.push(dish)
      });
    }
  }
  delete(dish: Dish): void {
    this.dishes = this.dishes.filter(h => h !== dish)
    this.dishService.deleteDish(dish).subscribe();
  }
}

```
### ../../../app02/frontend/src/app/menu/menu.component.html 
```
<div>
  <label>Dish name:<input #dishName /></label>
  <button (click)="add(dishName.value);dishName.value='';">
    add
  </button>
</div>
<ul class="menu">
  <li *ngFor="let dish of dishes">
    <a
    routerLink="/detail/{{dish.id}}">
      <span>{{dish.id}}</span>{{dish.name}}
    </a>
  <button class="delete" title="delete dish" 
    (click)="delete(dish)">X</button>
  </li>
</ul>

```
### ../../../app02/frontend/src/app/dish-detail/dish-detail.component.ts 
```
import { Component, OnInit, Input } from '@angular/core';
import { Dish } from '../dish';

import { ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';
import { DishService } from '../dish.service';

@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.component.html',
  styleUrls: ['./dish-detail.component.css']
})
export class DishDetailComponent implements OnInit {

  @Input() dish : Dish;

  constructor(
    private route: ActivatedRoute,
    private dishService: DishService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getDish();
  }
  getDish(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.dishService.getDish(id)
      .subscribe(dish => this.dish = dish);
  }
  goBack(): void {
    this.location.back();
  }
  save(): void{
    this.dishService.updateDish(this.dish)
      .subscribe(() => this.goBack());
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
  <button (click)="goBack()">go back</button>
  <button (click)="save()">save</button>
  
```
### ../../../app02/frontend/src/app/dish.service.ts 
```
import { Injectable } from '@angular/core';
import { Dish } from './dish';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  private dishesUrl = 'api/dishes';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };
  constructor(
    private http: HttpClient, 
    private messageService: MessageService) { 
    }
  private log(message: string) {
    this.messageService.add(`DishService: ${message}`);

  }
  getDishes(): Observable<Dish[]>{
    return this.http.get<Dish[]>(this.dishesUrl)
      .pipe(
        tap(_ => this.log('fetched dishes')),
        catchError(this.handleError<Dish[]>('getDishes',[]))
      );
  }
  getDish(id: number): Observable<Dish>{
    const url = `${this.dishesUrl}/${id}`;
    return this.http.get<Dish>(url)
      .pipe(
        tap(_ => this.log(`fethed: ${id}`)),
        catchError(this.handleError<Dish>(`getDish id:${id}`))
      );
  } 
  private handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }
  updateDish(dish: Dish): Observable<any>{
    return this.http.put(this.dishesUrl, dish, this.httpOptions)
    .pipe(
      tap(_ => this.log(`udpate: ${dish.id}`)),
      catchError( this.handleError<any>('updateDish'))
    );
  }
  addDish(dish: Dish): Observable<Dish>{
    return this.http.post<Dish>(this.dishesUrl, dish, this.httpOptions)
      .pipe(
        tap((newDish: Dish) => this.log(`added: ${newDish.id}`)),
        catchError(this.handleError<Dish>('addDish'))
      );
  }
  deleteDish(dish: Dish | number): Observable<Dish>{
    const id = typeof dish === 'number' ? dish : dish.id;
    const url = `${this.dishesUrl}/${id}`;
    return this.http.delete<Dish>(url, this.httpOptions)
      .pipe(
        tap(_ => this.log(`delele: ${id}`)),
        catchError(this.handleError<Dish>('deleteDish'))
      );
  }
  searchDish(term: string): Observable<Dish[]>{
    if(!term.trim()){
      return of([]);
    }else{
      return this.http.get<Dish[]>(`${this.dishesUrl}/?name=${term}`)
      .pipe(
        tap(x => x.length ? 
            this.log(`found dish matching: ${term}`):
            this.log(`no dish matching: ${term}`)),
        catchError(this.handleError<Dish[]>('searchDish',[])));
    }
  }
  getDishNo404<Data>(id: number): Observable<Dish>{
    const url = `${this.dishesUrl}/?id=${id}`;
    return this.http.get<Dish>(url)
      .pipe(
        map(dishes => dishes[0]),
        tap(h => {
          const outcome = h ? 'fetched' : 'did not find';
          this.log(`${outcome} dish id: ${id}`);
        } ),
        catchError(this.handleError<Dish>(`getDish id=${id}`))
      );
  }
}

```
### ../../../app02/frontend/src/app/message.service.ts 
```
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messages: string[] = [];

  constructor() { }

  add(message: string){
    this.messages.push(message);
  }
  clear(){
    this.messages = [];
  }
}
  
```
### ../../../app02/frontend/src/app/messages/messages.component.ts 
```
import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor(public messageService: MessageService) { }

  ngOnInit(): void {
  }

}

```
### ../../../app02/frontend/src/app/messages/messages.component.html 
```
<div *ngIf="messageService.messages.length">
    <h2>Messages</h2>   
    <button class="clear"
        (click)="messageService.clear()"
    >clear</button>
    <div *ngFor="let message of messageService.messages">{{message}}</div>
</div>

```
### ../../../app02/frontend/src/app/dashboard/dashboard.component.ts 
```
import { Component, OnInit } from '@angular/core';
import { Dish } from '../dish';
import { DishService } from '../dish.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  dishes: Dish[] = [];

  constructor(private dishService: DishService) { }

  ngOnInit(): void {
  }

  getDishes(): void {
    this.dishService.getDishes()
      .subscribe(dishes => this.dishes = dishes.slice(1,5));
  }
}

```
### ../../../app02/frontend/src/app/dashboard/dashboard.component.html 
```
<h3>Top dishes</h3>
<div class="grid grid-pad">
    <a *ngFor="let dish of dishes" class="col-1-4"
        routerLink="/detail/{{dish.id}}">
        <div class="module dish">
            <h4>{{dish.name}}</h4>
        </div>
    </a>
</div>

<app-dish-search></app-dish-search>
```
### ../../../app02/frontend/src/app/dish-search/dish-search.component.ts 
```
import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { Dish } from '../dish';
import { DishService } from '../dish.service';


@Component({
  selector: 'app-dish-search',
  templateUrl: './dish-search.component.html',
  styleUrls: ['./dish-search.component.css']
})
export class DishSearchComponent implements OnInit {

  dishes$: Observable<Dish[]>;
  private searchTerms = new Subject<string>()

  constructor(private dishService: DishService) { }

  ngOnInit(): void {
    this.dishes$ = this.searchTerms
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term:string) => this.dishService.searchDish(term))
      );
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

}

```
### ../../../app02/frontend/src/app/dish-search/dish-search.component.html 
```
<div id="search-component">
    <h4><label for="search-box">Dish Search</label></h4>
    <input #searchBox id="search-box" (input)="search(searchBox.value)" />
    <ul class="search-result">
        <li *ngFor="let dish of dishes$ | async">
            <a routerLink="/detail/{{dish.id}}">
                {{dish.name}}
            </a>
        </li>
    </ul>
</div>

```
