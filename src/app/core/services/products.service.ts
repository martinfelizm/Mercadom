import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable, empty,of } from 'rxjs';
import { map } from "rxjs/operators";
import { Product } from '../../shared/models/product';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentData } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  public productCollection: AngularFirestoreCollection<Product>;
  public productCollectionId: AngularFirestoreCollection<Product>;
  public product: Observable<Array<Product>>;
  public productID: any;
  public productDoc: Promise<Product>;
  public productList: AngularFireList<Product>;
  public productLists: AngularFireObject<Product>;
  public productDetails: DocumentData;
  p: any;
  private dom: Promise<AngularFirestoreDocument>;
  constructor(public afs: AngularFirestore) {
    // this.product = afs.collection('product').valueChanges();
    this.productCollection = afs.collection<Product>('Products');
    this.product = this.productCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Product;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getById(id: string){

     this.productDoc = this.afs.collection<Product>('Products').doc(id).ref.get().then(function (doc) {
      //const id = doc.id;
      /* const id = doc.id;
       const name = doc.data().doc.name;
       const bibliography = doc.data().doc.bibliography;
       const heroe = doc.data().doc.heroe;*/
      const id = doc.id;
      const data = doc.data();      
      
      return { id, ...data } as Product;
    });
  }
  getProductById(id: string) {
   this.getById(id);
   
    /* this.afs.collection<Product>('Products').doc(id).ref.get().then(function (doc) {
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
     return this.productDoc;
  }

  getProducts() {
    this.productCollection = this.afs.collection<Product>('Products');
    this.product = this.productCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Product;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return this.product;
  }

  addProduct(product: Product) {
    this.productCollection.add(product);
  }

  updateProduct(product: any) {
   // console.log("Here!! "+product.id);
   
    return this.afs.firestore.collection("Products").doc(product.id).set(product);
    
  }

  deleteProduct(product: Product) {
    return this.afs.firestore
      .collection("Products")
      .doc(product.Id.toString())
      .delete();
  }
}
