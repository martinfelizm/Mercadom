import { Component, OnInit, OnDestroy,ViewChild } from '@angular/core';
import { Product } from '../../models/product';
import { ProductsType } from '../../models/productstype';
import { Packing } from '../../models/packing';
import { ProductsService } from '../../../core/services/products.service';
import { PackingService } from '../../../core/services/packing.services';
import { ProductsTypeService } from '../../../core/services/productsType.service';
import { Router, RouterModule } from '@angular/router';
import { HomeService } from '../../../core/services/home.service';
import { ProductsdetailsComponent } from '../productsdetails/productsdetails.component';
import { CommonModule } from '@angular/common';
import { FormsModule, FormGroup, Validators } from '@angular/forms';
import { ISubscription } from 'rxjs/Subscription';
//import { NgxMaskModule, IConfig } from 'ngx-mask';
import { TextMaskModule } from 'angular2-text-mask';
import{ jqxMaskedInputComponent } from 'jqwidgets-ng/jqxmaskedinput';  
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { CurrencyMaskModule } from "ng2-currency-mask";
import IMask from 'imask';
import { importType } from '@angular/compiler/src/output/output_ast';
import { AngularFireAuth } from "@angular/fire/auth";
import { User } from 'app/shared/models/user';
import * as bootstrap from "bootstrap";
import * as $ from "jquery";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss','../../../../@fortawesome/fontawesome-free/css/all.css']
})


export class ProductsComponent implements OnInit, OnDestroy{

  public searchText: string;
  public selectedProduct: Product;
  public selectedempaque:Packing;
  public products: Array<Product>;
  public typeProd: Array<ProductsType>;
  public packings: Array<Packing>;
  private subscription: ISubscription;  
  private subscription1: ISubscription;
  private subscription2: ISubscription;
  public addCustomerForm: FormGroup;
  public myPrecio = ''
  public myCant = ''
  public maskTelf = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public maskPrice = ['$', /[1-9]/, /\d/];
  productos : Product = {Id:0, Name:'', Packing: "0", PriceByUND: "0", Quantity: 0, 
  Enable: true, Type: "0", CreationDate:''
  }
  
  //selectedempaque:Packing = new Packing("0",'---SELECCIONE---')
   /* empaques = [
      new Packing("0",'---SELECCIONE---'),
      new Packing("1", 'CAJA' ),
      new Packing("2", 'PAQUETE'),
      new Packing("3", 'SOBRE' ),
      new Packing("4", 'UNIDAD'),
      new Packing("5", 'CANASTA')

   ]*/
  constructor(private productService: ProductsService,
     private homeService: HomeService, private router: Router, 
     private prodTypeService:ProductsTypeService, private packingService:PackingService,
     private fAuth: AngularFireAuth) {
  }
  
  ngOnInit() {
    
    this.getPacking();
    this.getProd();
    this.getTypeProd();
    //this.subscription.unsubscribe();
    this.homeService.setActiveNav(true);
  }

  getProd() { 
    this.products = [];
    this.subscription = this.productService.getProducts().subscribe(data => {
      this.products = data;
      console.log("Productos");
    });
    
}
getTypeProd() { 
  this.typeProd = [];
  this.subscription = this.prodTypeService.getprodTypes().subscribe(data => {
    this.typeProd = data;
    console.log("Productos");
  });
 
}
getPacking() { 
  this.packings = []; 
  this.subscription = this.packingService.getpackings().subscribe(data => {
    this.packings = data;
  //  this.selectedempaque = new Packing(0,'---SELECCIONE---');
    console.log(data);
  });
  
}
  onSelected(empaqueid) { 
    this.selectedempaque = null;
    for (var i = 0; i < this.packings.length; i++)
    {
      if (this.packings[i].id == empaqueid) {
        this.selectedempaque = this.packings[i];
        console.log(empaqueid+" "+this.packings[i].name);
      }
    }
}
  deleteP(product: Product) {
    this.productService.deleteProduct(product);
    //console.log(id);
    this.router.navigate(['products']);

  }
  onSelect(product: Product): void {
    this.selectedProduct = product;
    this.router.navigate(["/productsDetails", product.Id]);
    //console.log("ID productos: "+product.Id);
  }
  newProd({value}:{value:Product} ) {    
   // this.router.navigate(["/productsDetails",1532100463]);
    //console.log("ID productos: "+product.Id);
    value.Id = this.products.length+1;
    value.CreationDate = new Date();
    value.Enable = true;
    if(value.Name!="" && value.PriceByUND !="0" && value.PriceByUND != null && 
        value.Quantity.toString()!="0" && value.Type !="0" && value.Packing !="0"){
        this.fAuth.authState.subscribe(userg =>{
        value.Name = value.Name.toUpperCase();
        value.CreationUser = userg.email;     
        this.productService.addProduct(value);
        $('#alertConfProd').css("display","block");
        $('#alertConflblProd').text("The item : "+ value.Name +" have been saved updated !!! ");
        $('#newProModal').modal('hide');
      })

      // this.router.navigate(['/products']);
  
      
    }
    else{
      $('#alertConfProd').css("display","block");
      $('#alertConflblProd').text("ERROR: the item could not be created, there is empty or unselected data !!! "); 
    }
   
  }
  newProdShow(){
    $('#txtProN').val('');
    $('#txtPrice').val('');
    $('#txtCantidad').val('');
    $('#pacSelect').val('0');
    $('#typeSelect').val('0');
    $('#alertConfProd').css("display","none");
    $('#alertConflblProd').text("");
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
