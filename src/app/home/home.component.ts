import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  cart_data : any;
  products : any;
  constructor(private http : HttpClient) { }
  
  toCart(data) {
    var currentUser = localStorage.getItem('currentUser');
    const cartData = {
      product_name : data.product_name,
      product_price : data.product_price,
      product_description : data.product_description,
      product_discount : data.product_discount,
      product_image : data.product_image,
      cart_user : currentUser
    }
    //console.log(cartData);
    this.cart_data = JSON.parse(localStorage.getItem('cartData')) || [];
    this.cart_data.push(cartData);
    console.log(this.cart_data);
    localStorage.setItem('cartData', JSON.stringify(this.cart_data));
  }


  ngOnInit(): void {
    this.products = JSON.parse(localStorage.getItem('productData'));
  }

}
