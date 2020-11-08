import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrls: ['./buy-product.component.css']
})
export class BuyProductComponent implements OnInit {
  products: any = [];
  searchText: string;
  form: FormGroup;
  product_image : any;
  dT : any;
  submitted = false;
  quantity : number;
  pname : string;
  pdesc : string;
  pprice : number;
  pdisc : number;
  pcat : string;
  constructor(private sharedService: SharedService, private router: Router, private formBuilder: FormBuilder) { }

  onLogout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/']);
  }

  Wishlist() {
    this.router.navigate(['/wishlist']);
  }

  onSubmit() {
    console.log(this.f.product_quantity.value);
    this.submitted = true;
    if(this.form.invalid) {
      return;
    }
    this.products = JSON.parse(localStorage.getItem('orders')) ||[];
    let currentUser = localStorage.getItem('currentUser');
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];
    let dateTime = new Date();
    this.dT = dateTime.getDate().toString() +" "+ monthNames[dateTime.getMonth()] +" "+ dateTime.getFullYear().toString();
    const orders = {
      product_name : this.pname,
      product_quantity : this.f.product_quantity.value,
      product_description : this.pdesc,
      product_price : this.pprice,
      product_category : this.pcat,
      product_discount : this.pdisc,
      cart_user : currentUser,
      product_image : this.product_image,
      purchased : 0,
      time : this.dT
    }

    this.products.push(orders);
    localStorage.setItem('orders', JSON.stringify(this.products));
    this.products = JSON.parse(localStorage.getItem('productData'));
    this.products.find(x => {
      if(x.product_name === this.pname && x.product_category === this.pcat && x.product_price === this.pprice) {
          x.product_quantity = x.product_quantity - this.f.product_quantity.value;
      }
    })

    localStorage.setItem('productData', JSON.stringify(this.products));
    this.router.navigate(['/previousOrders']);

  }

  PreOrders() {
    this.router.navigate(['/previousOrders']);
  }

  ngOnInit(): void {
    let numericRegex = /^[1-9][0-9]*$/;
    this.sharedService.currentData.subscribe(data => {
      this.form = this.formBuilder.group({
        product_quantity: ['', [Validators.required, Validators.pattern(numericRegex), Validators.max(data.product_quantity)]]
      })
      // this.f.product_name.setValue(data.product_name);
      // this.f.product_quantity.setValue(1);
      // this.f.product_price.setValue(data.product_price);
      // this.f.product_description.setValue(data.product_description);
      // this.f.product_discount.setValue(data.product_discount);
      // this.f.product_category.setValue(data.product_category);
      // this.product_image = data.product_image;
      // this.quantity = data.product_quantity;
      this.pname = data.product_name;
      this.pdesc = data.product_description;
      this.pcat = data.product_category;
      this.pdisc = data.product_discount;
      this.product_image = data.product_image;
      this.quantity = data.product_quantity;
      this.pprice = data.product_price;
      console.log(this.quantity);
    })
  }

  get f() {
    return this.form.controls;
  }

}
