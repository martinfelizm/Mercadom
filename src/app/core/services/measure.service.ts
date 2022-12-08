import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable,empty,of } from 'rxjs';
import { Measure } from '../../shared/models/measure';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreModule, DocumentData, AngularFirestoreCollection} from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
//import { fire } from 'angularfire2/firestore'
import { Action } from 'rxjs/internal/scheduler/Action';
import { resolve } from 'dns';


@Injectable({
  providedIn: 'root'
})

export class MeasureService {
  public measureCollection: AngularFirestoreCollection<Measure>;
  public measure: Observable<Array<Measure>>;
  public measureDoc:Promise<Measure>;
  public measureDoc2:AngularFirestoreDocument<Measure>;

  constructor( public afs: AngularFirestore) { 
    this.measureCollection = afs.collection<Measure>('Measure');
    this.measure = this.measureCollection.snapshotChanges().pipe(
      map(action => action.map( a=>{
        const data = a.payload.doc.data() as Measure;
        const id = a.payload.doc.id;
        return {id, ...data}
      })
      )
    )

  }
  
  getById(id:string){
    this.measureDoc = this.afs.collection<Measure>('Measure').doc(id).ref.get().then(function(doc){
      const data = doc.data();
      const id = doc.id;

      return {id, ...data} as Measure;
    });
  }

  getMeasureByID(id:string){
      this.getById(id);

      return this.measureDoc;
  }

  getMeasures(){
    
    this.measureCollection = this.afs.collection<Measure>('Measure');
    this.measure = this.measureCollection.snapshotChanges().pipe(
      map( actions => actions.map( a=> {      
        const data = a.payload.doc.data() as Measure;
        const id = a.payload.doc.id;
        return {id, ...data};
      })

      )
    )
   
    return this.measure;
  }

  addMeasure(measure : Measure){
     this.measureCollection.add(measure);
  }

  updateMeasure(measure : any){
   let meas: any={
    name : measure.name.toUpperCase(),
    enable : measure.enable,
    createuser : measure.createuser,
    createdate : measure.createdate
    }
    //console.log(measure.id);
    return this.afs.firestore.collection("Measure").doc(measure.id).set(meas);
  }

  deleteMesaure(key){

  this.afs.collection("Measure").doc(key).delete()

  }
}
