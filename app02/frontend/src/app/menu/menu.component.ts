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
