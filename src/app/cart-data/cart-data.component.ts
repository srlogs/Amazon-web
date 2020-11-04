import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-data',
  templateUrl: './cart-data.component.html',
  styleUrls: ['./cart-data.component.css']
})
export class CartDataComponent implements OnInit {
  allProducts: any;
  products: any = [];
  constructor(private router: Router) { }

  toBuy(data) {

  }

  toRemove(data) {
    var currentUser = localStorage.getItem('currentUser');
    let index = this.allProducts.findIndex(x => x.cart_user === currentUser && x.product_name === data.product_name && x.product_description === data.product_description && x.product_price === data.product_price);
    this.allProducts.splice(index, 1);
    localStorage.setItem('cartData', JSON.stringify(this.allProducts));
    this.allProducts = JSON.parse(localStorage.getItem('cartData')) || [];
    this.products = [];
    this.allProducts.find(x => {
      if (x.cart_user === currentUser) {
        this.products.push(x);
      }
    })
  }

  ngOnInit(): void {
    var currentUser = localStorage.getItem('currentUser');
    this.allProducts = JSON.parse(localStorage.getItem('cartData')) || [];
    this.allProducts.find(x => {
      if (x.cart_user === currentUser) {
        this.products.push(x);
      }
    })
  }
}
