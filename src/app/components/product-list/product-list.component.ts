import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from 'src/app/interfaces/Product';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

products:Product[]=[];

  constructor(private productService:ProductService){}

  ngOnInit(): void {
      this.getProducts();
  }
  getProducts(){
   this.productService.getProducts()
    .subscribe({
      next: res=> {
        console.log(res);
        this.products=res;
        console.log(`Productos1: ${this.products}`);
      },
      error: err=> {
        console.log(err)
      }
    });
    console.log(`Productos2: ${this.products}`);

  }

  deleteProduct(id:any){
    this.productService.deleteProduct(id)
    .subscribe(
      {
        next: res=>{
          this.getProducts();
          console.log(res);
        },
        error: err=>{
          console.log(err);
        }
      }
    );
  }

  updateProduct(){
    //this.productService.updateProduct()
  }
  

}
