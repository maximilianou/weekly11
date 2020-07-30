import { Injectable } from '@angular/core';
import { Dish } from './dish';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { ThrowStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  private dishesUrl = 'api/dishes';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };
  constructor(
    private http: HttpClient, 
    private messageService: MessageService) { 
    }
  private log(message: string) {
    this.messageService.add(`DishService: ${message}`);

  }
  getDishes(): Observable<Dish[]>{
    return this.http.get<Dish[]>(this.dishesUrl)
      .pipe(
        tap(_ => this.log('fetched dishes')),
        catchError(this.handleError<Dish[]>('getDishes',[]))
      );
  }
  getDish(id: number): Observable<Dish>{
    const url = `${this.dishesUrl}/${id}`;
    return this.http.get<Dish>(url)
      .pipe(
        tap(_ => this.log(`fethed: ${id}`)),
        catchError(this.handleError<Dish>(`getDish id:${id}`))
      );
  } 
  private handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }
  updateDish(dish: Dish): Observable<any>{
    return this.http.put(this.dishesUrl, dish, this.httpOptions)
    .pipe(
      tap(_ => this.log(`udpate: ${dish.id}`)),
      catchError( this.handleError<any>('updateDish'))
    );
  }
  addDish(dish: Dish): Observable<Hero>{
    return this.http.post<Dish>(this.dishesUrl, dish, this.httpOptions)
      .pipe(
        tap((newDish: Dish) => this.log(`added: ${newDish.id}`)),
        catchError(this.handleError<Dish>('addDish'))
      );

  }
}
