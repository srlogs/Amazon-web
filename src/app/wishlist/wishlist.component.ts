import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  products: any = [];
  allProducts: any;
  currentUser: any;
  cart_data: any;
  constructor(private router: Router) { }
  
  toCart(data) {
    this.allProducts = JSON.parse(localStorage.getItem('cartData')) || [];
    let product = this.allProducts.find(x => x.cart_user === this.currentUser && x.product_name === data.product_name && x.product_description === data.product_description && x.product_price === data.product_price);
    if(product) {
      localStorage.setItem('cartData', JSON.stringify(this.allProducts));
    }
    else {
      const cartData = {
        product_name: data.product_name,
        product_price: data.product_price,
        product_description: data.product_description,
        product_discount: data.product_discount,
        product_image: data.product_image,
        cart_user: this.currentUser
      }
      this.allProducts.push(cartData);
      console.log(this.allProducts);
      localStorage.setItem('cartData', JSON.stringify(this.allProducts));
    }
    this.router.navigate(['/cart']);
  }
  ngOnInit(): void {
    this.currentUser = localStorage.getItem('currentUser');
    this.allProducts = JSON.parse(localStorage.getItem('wishlist')) || [];
    this.allProducts.find(x => {
      if (x.cart_user === this.currentUser) {
        this.products.push(x);
        //console.log(this.products);
      }
    })
  }
}
