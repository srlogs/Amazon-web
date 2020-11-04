import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-data',
  templateUrl: './cart-data.component.html',
  styleUrls: ['./cart-data.component.css']
})
export class CartDataComponent implements OnInit {
  allProducts : any;
  products : any = [];
  constructor() { }

  toBuy(data) {

  }

  
  ngOnInit(): void {
    var currentUser = localStorage.getItem('currentUser');
    this.allProducts = JSON.parse(localStorage.getItem('cartData'));
    this.allProducts.find(x => {
      if(x.cart_user === currentUser) {
        this.products.push(x);
        console.log(this.products);
      }
    })
  }
}
