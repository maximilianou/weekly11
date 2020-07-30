import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Dish } from './dish';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb(){
    const dishes = [
      { id: 21, name: 'Lasagna' },
      { id: 22, name: 'Parmesana' },
      { id: 23, name: 'Ravioli' },
      { id: 24, name: 'Spaguetti' },
      { id: 25, name: 'Milanesa' },
      { id: 26, name: 'Risotto' },
      { id: 27, name: 'Soup' },  
    ];
    return { dishes };
  }
  genId(dishes: Dish[]): number {
    return dishes.length > 0 ? Math.max(...dishes.map(dish => dish.id) ) + 1 : 100;
  }
  
}
 