import { Component, OnInit } from '@angular/core';
import { Dish } from '../dish';
//import { DISHES } from '../mock-dishes';
import { DishService } from '../dish.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  dishes: Dish[];
  selectedDish: Dish;

  constructor(
    private dishService: DishService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.getDishes();
  }

  onSelect(dish: Dish): void{
    this.selectedDish = dish;
    this.messageService.add(`DishComponent, Selected id=${dish.id}`);
  }

  getDishes(): void{
    this.dishService.getDishes()
      .subscribe( dishes => this.dishes = dishes );
  }
}
