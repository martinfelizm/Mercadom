
import { Component } from '@angular/core';


export class ProductsType {
    constructor(
        public id?: string,
        public type?: string,
        public name?: string,        
        public enable?: boolean,
        public activeuser?:string,
        public creationdate?: any
       
    ){}
}