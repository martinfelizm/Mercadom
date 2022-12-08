import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ProductsTypeService } from '../../../core/services/productsType.service';
import { PackingService } from '../../../core/services/packing.services';
import { ProductsService } from '../../../core/services/products.service';
import { ProductsType } from '../../models/productstype';
import { Packing } from '../../models/packing';
import { Product } from '../../models/product';
import { ISubscription } from 'rxjs/Subscription';
import { Measure } from 'app/shared/models/measure';
import { MeasureService } from 'app/core/services/measure.service';
import { AngularFireAuth } from '@angular/fire/auth';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { ModalService } from 'app/core/services/modal.service';
import { FormsModule, Validators, FormBuilder } from '@angular/forms';
//import * as bootstrap from "bootstrap";
//import * as $ from "jquery";
//import { ModalDirective } from '../../models/modaldirective'
//import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { types } from 'util';
import { ModalDirective } from 'app/shared/models/modaldirective';
import { Button } from 'protractor';
import { Observable } from 'rxjs';

declare var jQuery:any;
@Component({
  selector: 'app-configurations',
  templateUrl: './configurations.component.html',  
  styleUrls: ['./configurations.component.scss','../../../../@fortawesome/fontawesome-free/css/all.css']
  
})

export class ConfigurationsComponent implements OnInit, OnDestroy {
  packing: Array<Packing>;
  prodtypes: Array<ProductsType>;
  measure: Array<Measure>;
  measureDoc: Measure;
  PackingDoc: Packing;
  productsTypesDoc:ProductsType;
  products: Array<Product>;
  private subscription : ISubscription;
  public selectedempaque : Product;
  constructor(private prodTypeService: ProductsTypeService
    , private packingService : PackingService
    , private measureService : MeasureService 
    , private productService : ProductsService
    ,private fAuth: AngularFireAuth) { }

  ngOnInit() {
    $('[rel="tooltip"]').tooltip({trigger: "hover"});
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover();
    this.getPacking();
    this.getProdType();
    this.getMeasure();
    this.getProducts();
  }

  getPacking(){
    this.packing = [];
    this.subscription = this.packingService.getpackings().subscribe( data =>{
    this.packing = data;
    
    })
  }
  getProdType(){
    this.prodtypes = [];
    this.subscription = this.prodTypeService.getprodTypes().subscribe( data =>{
      this.prodtypes = data;      
    })
  }

  getMeasure(){
    this.measure = [];
    this.subscription = this.measureService.getMeasures().subscribe( data =>{
      this.measure = data;
    })
  }
  getProducts(){
    this.products = [];
    this.subscription = this.productService.getProducts().subscribe(data =>{

      this.products = data;   
    })
  }

  newMeasureShow(){
    //this.modalService.open("#newMeasureModal");
   // $('#newMeasureModal').addClass("fade show")    
   //document.getElementById()
  // document.getElementById('newMeasureModal').style.display = "block";
   
   $('#txtMeasName').val('');
   $('#newMeasureModalLabel').text('New Measure'); 
   $('#btnEditMeasure').css("display","none");
   $('#btnSaveMeasure').css("display","block");
   $('#alertConfMeas').css("display","none");  

  }
  newPacProShow(){
    $('#txtPacName').val('');    
   // $('.modal-backdrop').addClass("fade show")
    $('#idPacSelected').val('0');
    $('#packingMeasu').val('0');
    $('#txtPacunits').val('0.00');  
    $('#newPacProModalLabel').text('New Packing');     
    $('#btnEditPacking').css("display","none");
    $('#btnSavePacking').css("display","block");
    $('#alertConfPac').css("display","none");
  }
  newTypeProdShow(){
    //this.modalService.open("#newMeasureModal");
   // $('#newMeasureModal').addClass("fade show")    
   //document.getElementById()
  // document.getElementById('newMeasureModal').style.display = "block";
   
   $('#txtTypeProdName').val('');
   $('#newTypeProdModalLabel').text('New Type Products'); 
   $('#btnEditTypeProd').css("display","none");
   $('#btnSaveTypeProd').css("display","block");
   $('#alertConfTypeProd').css("display","none");  

  }
  EditPacking(value:Packing){  
    $('#btnSavePacking').css("display","none");
    $('#btnEditPacking').css("display","block");
    $('#newPacProModalLabel').text('Edit Packing'); 
    $('#txtPacName').val(value.name);
    $('#packingMeasu').val(value.measure);     
    $('#idPacSelected').val(value.product); 
    $('#txtPacunits').val(value.units);  
    $('#alertConfPac').css("display","none");
    this.PackingDoc = value;     
  //   alert(value.product + " -- " + value.measure);
  //   console.log(value.measure);
  }

  EditPackingSave({value}:{value:Packing}){   
    this.PackingDoc.measure = $('#packingMeasu').val().toString();     
    this.PackingDoc.units = $('#txtPacunits').val().toString(); 
    this.PackingDoc.product = $('#idPacSelected').val().toString(); 
    this.PackingDoc.name = $('#txtPacName').val().toString();
    if($('#packingMeasu').val().toString()!="" && $('#packingMeasu').val().toString()!="0" && $('#packingMeasu').val().toString()!=undefined &&
    $('#txtPacunits').val().toString()!="" && $('#txtPacunits').val().toString()!="0.00" && $('#txtPacunits').val().toString()!=undefined &&
    $('#idPacSelected').val().toString()!= "" && $('#idPacSelected').val().toString()!="0" && $('#idPacSelected').val().toString()!=undefined &&
    $('#txtPacName').val().toString()!="" && $('#txtPacName').val().toString()!=undefined )
    {
      this.packingService.updatepacking(this.PackingDoc);
     // $('#alertConf').css("display","block");
     // $('#alertConflbl').text("The item : "+ this.PackingDoc.name +" have been successfully updated !!! ");
     let btn = document.getElementById("btnCerrarPack");
      btn.click();  
      let msg = "have been successfully updated !!!";
     this.CallAlert(this.PackingDoc.name, msg);      
    }
   else{
    $('#alertConfPac').css("display","block");
    $('#alertConflblPac').text("ERROR: the item : "+ this.PackingDoc.name +" could not be updated, is empty or has no changes !!! "); 
   }
  }

  EditTypeProd(value:ProductsType){  
    $('#btnSaveTypeProd').css("display","none");
    $('#btnEditTypeProd').css("display","block");
    $('#newTypeProdModalLabel').text('Edit Product Type'); 
    $('#txtTypeProdName').val(value.name);
    $('#alertConfTypeProd').css("display","none");
    this.productsTypesDoc = value;     
  //   alert(value.product + " -- " + value.measure);
    console.log(this.productsTypesDoc);
  }

  EditTypeProdSave({value}:{value:ProductsType}){   
      
    if($('#txtTypeProdName').val().toString()!="" && $('#txtTypeProdName').val().toString()!=undefined && this.productsTypesDoc.name != $('#txtTypeProdName').val().toString() )
    {
    
      this.productsTypesDoc.name = $('#txtTypeProdName').val().toString();
     this.prodTypeService.updateprodType(this.productsTypesDoc);
     let btn = document.getElementById("btnCerrarTypeProd");
     btn.click();  
     let msg = "have been successfully updated !!!";
     this.CallAlert(this.productsTypesDoc.name, msg);   
      
    }
   else{
    $('#alertConfTypeProd').css("display","block");
    $('#alertConflblTypeProd').text("ERROR: the item : "+ this.productsTypesDoc.name +" could not be updated, is empty or has no changes !!! "); 
   }
    
  }

  EditMeasure(value:Measure){  
    $('#btnSaveMeasure').css("display","none");
    $('#btnEditMeasure').css("display","block");
    $('#newMeasureModalLabel').text('Edit Measure'); 
    $('#txtMeasName').val(value.name);
    $('#alertConfMeas').css("display","none");
    this.measureDoc = value;     
  //   alert(value.product + " -- " + value.measure);
  //   console.log(value.measure);
  }
  EditMeasureSave({value}:{value:Measure}){   
    
    if($('#txtMeasName').val().toString()!="" && $('#txtMeasName').val().toString()!=undefined && this.measureDoc.name != $('#txtMeasName').val().toString() )
    {
      this.measureDoc.name = $('#txtMeasName').val().toString();
     this.measureService.updateMeasure(this.measureDoc);
     let msg = "have been successfully updated !!!";
     let btn = document.getElementById("btnCerrarMeas");
     btn.click();  

     this.CallAlert(this.measureDoc.name,msg);   
      
    }
   else{
    $('#alertConfMeas').css("display","block");
    $('#alertConflblMeas').text("ERROR: the item : "+ this.measureDoc.name +" could not be updated, is empty or has no changes !!! "); 
   }
    
  }
  CallAlert(item:string,message?:string){
    console.log(item);
    $('#lblActivityConf').text("The item : "+ item +" "+message);    
    let btn2 = document.getElementById("btnCallAlert");
    btn2.click(); 
    $('.modal-backdrop').remove();
    setTimeout(function(){
      let btn3 = document.getElementById("btnCloseAlert");
      btn3.click();
    },10000 );
  } 

  SavePacking({value}:{value:Packing}){
    console.log(value);
    if(value.name != "" &&  value.product != "" && value.name != undefined && value.product != undefined){
      value.name = value.name.toUpperCase();
     // value.id = this.packing.slice(-1)[0].id+1;
      value.creationdate = new Date();
      value.status = true;
      this.fAuth.authState.subscribe(user =>{
        value.creationuser = user.email;
        this.packingService.addpacking(value);
        let btn = document.getElementById("btnCerrarPack");
        btn.click();

        let msg = "have been successfully saved !!!";
        this.CallAlert(value.name, msg); 
      })
    }
    else{
      $('#alertConfPac').css("display","block");
      $('#alertConflblPac').text("ERROR: the item could not be created, there is empty or unselected data !!! "); 
    }
  }

  DeletePacking(packing:Packing){
    this.packingService.deletepacking(packing.id);
   // alert('Deleted Packing with Name : '+packing.name.toUpperCase());
   let msg = "have been successfully deleted !!!";
    this.CallAlert(packing.name.toUpperCase(), msg);
 
  }

  SaveMeasure({value}:{value:Measure}){

    if(value.name !="" && value.name != undefined ){
      value.name = value.name.toUpperCase();

      value.createdate = new Date();
      value.enable = true;
      this.fAuth.authState.subscribe(user =>{
        value.createuser = user.email;
       this.measureService.addMeasure(value);
      // $('#alertConf').css("display","block");
      // $('#alertConflbl').text("The item : "+ value.name +" have been saved updated !!! ");
        let btn = document.getElementById("btnCerrarMeas");
        btn.click();   

        let msg = "have been successfully saved !!!";
        this.CallAlert(value.name, msg);
        // $('#newMeasureModal').modal('hide');           
      })     
    }  
    else{
      $('#alertConfMeas').css("display","block");
      $('#alertConflblMeas').text("ERROR: the item could not be created, there is empty or unselected data !!! "); 
    }  
  }

  DeleteMeasure(measure:Measure){
   this.measureService.deleteMesaure(measure.id);

   let msg = "have been successfully deleted !!!";
   this.CallAlert(measure.name.toUpperCase(), msg);
  //alert('Deleted Measure with Name : '+measure.name.toUpperCase());
  }

  SaveTypeProd({value}:{value:ProductsType}){

    if(value.name !="" && value.name != undefined ){
      value.name = value.name.toUpperCase();
      value.creationdate = new Date();
      value.enable = true;
      this.fAuth.authState.subscribe(user =>{
        value.activeuser = user.email;
       this.prodTypeService.addprodType(value);
       // $('#alertConfTypeProd').css("display","block");
       // $('#alertConflblTypeProd').text("The item : "+ value.name +" have been saved updated !!! ");
        let btn = document.getElementById("btnCerrarTypeProd");
        btn.click();   

        let msg = "have been successfully saved !!!";
        this.CallAlert(value.name, msg);
        // $('#newMeasureModal').modal('hide');           
      })     
    }  
    else{
      $('#alertConfTypeProd').css("display","block");
      $('#alertConflblTypeProd').text("ERROR: the item could not be created, there is empty or unselected data !!! "); 
    }  
  }

  DeleteTypeProd(typeprod:ProductsType){
   this.measureService.deleteMesaure(typeprod.id);

   let msg = "have been successfully deleted !!!";
   this.CallAlert(typeprod.name.toUpperCase(), msg);
  //alert('Deleted Measure with Name : '+measure.name.toUpperCase());
  }



  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
