import { Component } from '@angular/core';


export class Packing {
    constructor(
        public id?: string,
        public name?: string,
        public status?: boolean,
        public units?: string,
        public product?:string,
        public measure?:string,
        public creationuser?:string,
        public creationdate?:any
    ){}
}
