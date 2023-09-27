import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { Product } from 'src/app/interfaces/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  product:Product={
    name:'',
    description: '',
    price: 0,
    imageURL: ''
  };

  edit:boolean=false;

ngOnInit(): void {
  const id= this.activatedRouter.snapshot.params['id'];
  console.log(id)
  if(id){
    this.productService.getProduct(id)
    .subscribe({
      next: res =>{
        console.log(res);
        this.product=res;
        this.edit=true;
      },
      error: err=>{
        console.log(err);
      }
    })
  }
}

constructor(private productService:ProductService, private router:Router,private activatedRouter:ActivatedRoute){}

  submitProducto(){
     console.log(this.product);
     this.productService.createProduct(this.product).subscribe(
      res=>{
      console.log(res);
      this.router.navigate(['']);
      },
      err=>console.log(err)
     );
  }

  editProduct(){
delete this.product.createdAt;
    
    this.productService.updateProduct(this.product._id,this.product)
    .subscribe({
      next: res=>{
        console.log(res);
        this.router.navigate(['product']);
      },
      error: err=>{
        console.log(err);
      }
    })
  }

}
