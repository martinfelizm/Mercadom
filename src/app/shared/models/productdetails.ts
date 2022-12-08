import { Component } from '@angular/core';


export class Productdetails {
    constructor(
        public Id?: string,
        public Name?: string,
        public PriceByUND?: number,
        public Quantity?: number,
        public Email?: string,
        public CreationDate?: Date,
        public CreationUser?: string
    ){}
}
