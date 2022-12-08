import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable, empty,of } from 'rxjs';
import { map } from "rxjs/operators";
import { ProductsType } from '../../shared/models/productstype';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentData } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { promise } from 'protractor';

@Injectable({
    providedIn: 'root'
  })
  export class ProductsTypeService {
  
    public prodTypeCollection: AngularFirestoreCollection<ProductsType>;
    public prodTypeCollectionId: AngularFirestoreCollection<ProductsType>;
    public prodType: Observable<Array<ProductsType>>;
    public prodTypeID: any;
    public prodTypeDoc: Promise<ProductsType>;
    public prodTypeList: AngularFireList<ProductsType>;
    public prodTypeLists: AngularFireObject<ProductsType>;
    public prodTypeDetails: DocumentData;
    p: any;
    private dom: Promise<AngularFirestoreDocument>;
    constructor(public afs: AngularFirestore) {
      // this.product = afs.collection('product').valueChanges();
      this.prodTypeCollection = afs.collection<ProductsType>('ProductsType');
      this.prodType = this.prodTypeCollection.snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as ProductsType;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
    }
  
    getById(id: string){
   console.log('Here');
       this.prodTypeDoc = this.afs.collection<ProductsType>('ProductsType').doc(id).ref.get().then(function (doc) {
        //const id = doc.id;
        /* const id = doc.id;
         const name = doc.data().doc.name;
         const bibliography = doc.data().doc.bibliography;
         const heroe = doc.data().doc.heroe;*/
        const id = doc.id;
        const data = doc.data();      
        console.log(data);
        return { id, ...data } as ProductsType;
      });
    }
    getprodTypeById(id: string) {
     this.getById(id);
     
      /* this.afs.collection<TipoEmpaque>('Products').doc(id).ref.get().then(function (doc) {
         if (doc.exists) {
          // this.productDetails = doc.data() as Product;
           const id = doc.id;
           const data = doc.data();      
          console.log("Document data:",  { id, data });
         } else {
           console.log("No such document!");
         }
       }).catch(function (error) {
         console.log("Error getting document:", error);
       });*/
    
       
       //console.log(this.productDoc);
       return this.prodTypeDoc;
    }
  
    getprodTypes() {
      this.prodTypeCollection = this.afs.collection<ProductsType>('ProductsType');
      this.prodType = this.prodTypeCollection.snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as ProductsType;       
          const id = a.payload.doc.id;
         // console.log({id, ...data})
          return { id, ...data };
        }))
      );
      return this.prodType;
    }
  
    addprodType(prodType: ProductsType) {
      this.prodTypeCollection.add(prodType);
    }
  
    updateprodType(prodType: any) {
      
     let type: any={
      name : prodType.name.toUpperCase(),
      enable : prodType.enable,
      type : prodType.type,
      activeuser : prodType.activeuser,
      creationdate : prodType.creationdate
      }
      return this.afs.firestore.collection("ProductsType").doc(prodType.id).set(type);
      
    }
  
    deleteprodType(prodType: ProductsType) {
      return this.afs.firestore
        .collection("prodType")
        .doc(prodType.id)
        .delete();
    }
  }