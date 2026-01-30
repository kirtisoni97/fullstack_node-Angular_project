import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import{MatCardModule} from '@angular/material/card'
import { ApiService } from '../api.service';
import { debounceTime, Subject, switchMap } from 'rxjs';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule,MatFormFieldModule,MatInputModule,MatIconModule,FormsModule,MatCardModule ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
searchText=''
ProductList:any
search$ = new Subject<string>();
constructor(private apiservice:ApiService){}

  onSearch() {
  this.search$.next(this.searchText);
}

  ngOnInit(){
   this.getProductData()
    this.search$
    .pipe(
      debounceTime(1000),  
       switchMap(text => this.apiservice.SearchProduct(text))      
    )
    .subscribe((res:any) => {
     if(res.success){

      this.ProductList=res.data.products
    }
    });
  }

  getProductData(){
   this.apiservice.getList_API().subscribe({
     next: (res: any) => {
    if(res.success){
  console.log(res.data.products)
      this.ProductList=res.data.products
    }
  },
  error: (err) => {
    console.log('Search error:', err);
  }
} )
  }
}
