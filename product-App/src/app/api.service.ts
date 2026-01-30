import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  API_URL = 'http://localhost:3000/api/products';

  getList_API(){
    return this.http.get(this.API_URL).pipe(catchError(this.handleError) )
  }

  SearchProduct(name:string){

    return this.http.get(`${this.API_URL}/search?q=${name}`).pipe(catchError(this.handleError) )
  }
  
 private handleError(error: HttpErrorResponse) {
    let message = 'Something went wrong';
    if (error.error instanceof ErrorEvent) {
      message = error.error.message;
    } else {
      message = error.error?.message || `Server Error: ${error.status}`;
    }
    console.error('API Error:', message);

    return throwError(() => message);
  }
}
