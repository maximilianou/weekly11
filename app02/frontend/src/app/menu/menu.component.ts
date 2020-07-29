import { Component, OnInit } from '@angular/core';
import { Dish } from '../dish';
//import { DISHES } from '../mock-dishes';
import { DishService } from '../dish.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  dishes: Dish[];
  selectedDish: Dish;

  constructor(private dishService: DishService) { }

  ngOnInit(): void {
    this.getDishes();
  }

  onSelect(dish: Dish): void{
    this.selectedDish = dish;
  }

  getDishes(): void{
    this.dishes = this.dishService.getDishes();
  }
}
