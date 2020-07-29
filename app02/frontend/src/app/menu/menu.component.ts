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
