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
