import { Component, OnInit } from '@angular/core';
import { Dish } from '../dish';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  dish : Dish = { 
    id: 1,
    name: 'Lasagna'
  };

  constructor() { }

  ngOnInit(): void {
  }

}
