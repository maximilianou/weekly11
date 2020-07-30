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
