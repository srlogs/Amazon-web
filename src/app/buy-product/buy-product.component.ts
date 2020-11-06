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
  constructor(private sharedService: SharedService, private router: Router, private formBuilder: FormBuilder) { }

  onLogout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/']);
  }

  Wishlist() {
    this.router.navigate(['/wishlist']);
  }

  onSubmit() {
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
      product_name : this.f.product_name.value,
      product_quantity : this.f.product_quantity.value,
      product_description : this.f.product_description.value,
      product_price : this.f.product_price.value,
      product_category : this.f.product_category.value,
      product_discount : this.f.product_discount.value,
      cart_user : currentUser,
      product_image : this.product_image,
      purchased : 0,
      time : this.dT
    }

    this.products.push(orders);
    localStorage.setItem('orders', JSON.stringify(this.products));
    this.products = JSON.parse(localStorage.getItem('productData'));
    this.products.find(x => {
      if(x.product_name === this.f.product_name.value && x.product_category === this.f.product_category.value && x.product_price === this.f.product_price.value) {
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
    let numericRegex = /^[a-zA-Z0-9]+$/;
    this.form = this.formBuilder.group({
      product_name: ['', Validators.required],
      product_quantity: ['', [Validators.required, Validators.pattern(numericRegex)]],
      product_price: ['', Validators.required],
      product_description: ['', Validators.required],
      product_discount: ['', Validators.required],
      product_category: ['', Validators.required]
    })

    this.sharedService.currentData.subscribe(data => {
      this.f.product_name.setValue(data.product_name);
      this.f.product_quantity.setValue(1);
      this.f.product_price.setValue(data.product_price);
      this.f.product_description.setValue(data.product_description);
      this.f.product_discount.setValue(data.product_discount);
      this.f.product_category.setValue(data.product_category);
      this.product_image = data.product_image;
      //console.log(data);
    })
  }

  get f() {
    return this.form.controls;
  }

}
