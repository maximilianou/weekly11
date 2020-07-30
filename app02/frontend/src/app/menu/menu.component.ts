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
}
