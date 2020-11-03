import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-inventory',
  templateUrl: './admin-inventory.component.html',
  styleUrls: ['./admin-inventory.component.css']
})
export class AdminInventoryComponent implements OnInit {

  products : any;
  constructor() { 
  }

  ngOnInit(): void {
    this.products = JSON.parse(localStorage.getItem('productData'));
  }

}
