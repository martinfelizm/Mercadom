import { Component } from '@angular/core';

export class User {

    constructor(
        public Id?: string,
        public FullName?: string,
        public Pass?: string,
        public Enable?: boolean,
        public Role?: number,
        public Email?: string,
        public CreationDate?: Date,
        public CreationUser?: string
    ){}
}
