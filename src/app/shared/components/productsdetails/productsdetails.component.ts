import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../../models/product';
import { ProductsType } from '../../models/productstype';
import { ProductsService } from '../../../core/services/products.service';
import { ProductsTypeService } from '../../../core/services/productsType.service';
import { ActivatedRoute, ActivatedRouteSnapshot, Params, Router } from '@angular/router';
import { ISubscription } from 'rxjs/Subscription';
import { CurrencyPipe, formatCurrency } from '@angular/common';

@Component({
  selector: 'app-productsdetails',
  templateUrl: './productsdetails.component.html',
  styleUrls: ['./productsdetails.component.scss']
})
export class ProductsdetailsComponent implements OnInit  {
  private id: any;
  product: Array<Product>;
  prodtypes:Array<ProductsType>;
  private subscription: ISubscription;
  constructor(private productService: ProductsService
    , private route: ActivatedRoute
    , private router: Router
    , private prodTypeService : ProductsTypeService) { }

  ngOnInit() {
    $('[rel="tooltip"]').tooltip({trigger: "hover"});
    this.getProdType();
    this.id = this.route.snapshot.params['Id'];    
    //this.valores = this.route.snapshot.params;
    //console.log(this.valores);
   // console.log('ID : '+ this.id);
    if (this.id) {
      this.productService.getProductById(this.id).then(res => {
        this.product = res as any; 
        let produc ={
         Id: res.Id,
         Name: res.Name.toUpperCase(),
         Packing: res.Packing,
         PriceByUND: res.PriceByUND  ,
         Quantity: res.Quantity,
         Enable: res.Enable,
         Type: res.Type,
         CreationUser: res.CreationUser,
         CreationDate:res.CreationDate

        }
        console.log(produc);      
      });

    }
    //this.ngOnDestroy();
  }
 updateProd(product:Product){
   console.log("Update producto!!!");
   //console.log(product);
   if (product !== null && product !== undefined){
    this.productService.updateProduct(product);
    this.router.navigate(["/products"]);
   }
   
 }

 getProdType(){
  this.prodtypes = [];
  this.subscription = this.prodTypeService.getprodTypes().subscribe( data =>{
    this.prodtypes = data;
  })
}
CancelProdType(){
  this.router.navigate(["/products"]);
}
 /* ngOnDestroy(){
    this.subscription.unsubscribe();
  }*/
}
