import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  cart_data: any;
  wish_list: any;
  products: any;
  searchText : string;
  allProducts : any;
  temp : any = [];

  
  constructor(private http: HttpClient, private router: Router, private sharedService : SharedService) { }

  onLogout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/']);
  }

  toBuy(data) {
    this.sharedService.sendProductData(data);
    this.router.navigate(['/buyProduct']);
  }

  PreOrders() {
    this.router.navigate(['/previousOrders']);
  }

  Wishlist() {
    this.router.navigate(['/wishlist']);
  } 
 
  toCart(data) {
    var currentUser = localStorage.getItem('currentUser');
    const cartData = {
      product_name: data.product_name,
      product_price: data.product_price,
      product_description: data.product_description,
      product_discount: data.product_discount,
      product_image: data.product_image,
      product_category : data.product_category,
      product_quantity : data.product_quantity,
      cart_user: currentUser
    }
    //console.log(cartData);
    this.cart_data = JSON.parse(localStorage.getItem('cartData')) || [];
    let cart = this.cart_data.find(x => x.cart_user === currentUser && x.product_name === data.product_name && x.product_description === data.product_description && x.product_price === data.product_price);
    if (cart) {
      localStorage.setItem('cartData', JSON.stringify(this.cart_data));
    }
    else {
      this.cart_data.push(cartData);
      localStorage.setItem('cartData', JSON.stringify(this.cart_data));
    }
  }

  toWishList(data) {
    var currentUser = localStorage.getItem('currentUser');
    const wishlist = {
      product_name: data.product_name,
      product_price: data.product_price,
      product_description: data.product_description,
      product_image: data.product_image,
      cart_user: currentUser,
      product_discount: data.product_discount,
      product_category : data.product_category,
      product_quantity : data.product_quantity
    }
    this.wish_list = JSON.parse(localStorage.getItem('wishlist')) || [];
    let wlist = this.wish_list.find(x => x.cart_user === currentUser && x.product_name === data.product_name && x.product_description === data.product_description && x.product_price === data.product_price);
    if (wlist) {
      localStorage.setItem('wishlist', JSON.stringify(this.wish_list));
    }
    else {
      this.wish_list.push(wishlist);
      localStorage.setItem('wishlist', JSON.stringify(this.wish_list));
    }
  }


  ngOnInit(): void {
    this.products = JSON.parse(localStorage.getItem('productData'));
  }

}
