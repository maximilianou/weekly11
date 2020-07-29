import { Injectable } from '@angular/core';
import { Dish } from './dish';
import { DISHES } from './mock-dishes';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }

  getDishes(): Dish[]{
    return DISHES;
  }
}
