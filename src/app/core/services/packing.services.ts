import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable, empty,of } from 'rxjs';
import { map } from "rxjs/operators";
import { Packing } from '../../shared/models/packing';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentData } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { promise } from 'protractor';

@Injectable({
    providedIn: 'root'
  })
  export class PackingService {
  
    public packingCollection: AngularFirestoreCollection<Packing>;
    public packingCollectionId: AngularFirestoreCollection<Packing>;
    public packing: Observable<Array<Packing>>;
    public packingID: any;
    public packingDoc: Promise<Packing>;
    public packingList: AngularFireList<Packing>;
    public packingLists: AngularFireObject<Packing>;
    public packingDetails: DocumentData;
    p: any;
    private dom: Promise<AngularFirestoreDocument>;
    constructor(public afs: AngularFirestore) {
      // this.product = afs.collection('product').valueChanges();
      this.packingCollection = afs.collection<Packing>('Packing');
      this.packing = this.packingCollection.snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Packing;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
    }
  
    getById(id: string){
  
       this.packingDoc = this.afs.collection<Packing>('Packing').doc(id).ref.get().then(function (doc) {
        //const id = doc.id;
        /* const id = doc.id;
         const name = doc.data().doc.name;
         const bibliography = doc.data().doc.bibliography;
         const heroe = doc.data().doc.heroe;*/
        const id = doc.id;
        const data = doc.data();      
        
        return { id, ...data } as Packing;
      });
    }
    getpackingById(id: string) {
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
       return this.packingDoc;
    }
  
    getpackings() {
      this.packingCollection = this.afs.collection<Packing>('Packing');
      this.packing = this.packingCollection.snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Packing;
          const id = a.payload.doc.id ;
          return { id, ...data };
        }))
      );
      return this.packing;
    }
  
    addpacking(packing: Packing) {
      console.log(packing);
      this.afs.firestore.collection("Packing").add(packing);
      //this.packingCollection.add(packing);
    }
  
    updatepacking(packing: any) {
     // console.log("Here!! "+product.id);
     this.p = {
      creationdate : packing.creationdate,
      creationuser : packing.creationuser,
      name : packing.name,
      units : packing.units,
      product : packing.product,
      measure : packing.measure,
      status : packing.status,
     }
      return this.afs.firestore.collection("Packing").doc(packing.id).set(this.p);
      
    }
  
    deletepacking(packing: any) {
      this.packingCollection.doc(packing.id).delete()
      return this.afs.firestore
        .collection("Packing")
        .doc(packing)
        .delete();
    }
  }
  