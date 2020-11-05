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
  constructor(private sharedService: SharedService, private router: Router, private formBuilder: FormBuilder) { }

  onLogout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/']);
  }

  Wishlist() {
    this.router.navigate(['/wishlist']);
  }

  onSubmit() {

  }

  PreOrders() {

  }

  ngOnInit(): void {
    // this.sharedService.currentData.subscribe(data => {
    //   this.products.push(data);
    //   this.f.product_name.setValue(data.product_name);
    //   this.f.product_quantity.setValue(data.product_quantity);
    //   this.f.product_price.setValue(data.product_price);
    //   this.f.product_description.setValue(data.product_description);
    //   this.f.product_discount.setValue(data.product_discount);
    //   this.f.product_category.setValue(data.product_category);
    // })

    this.form = this.formBuilder.group({
      product_name: ['', Validators.required],
      product_quantity: ['', Validators.required],
      product_price: ['', Validators.required],
      product_description: ['', Validators.required],
      product_discount: [' ', Validators.required],
      product_category: ['', Validators.required]
    })

    this.sharedService.currentData.subscribe(data => {
      this.f.product_name.setValue(data.product_name);
      this.f.product_quantity.setValue(data.product_quantity);
      this.f.product_price.setValue(data.product_price);
      this.f.product_description.setValue(data.product_description);
      this.f.product_discount.setValue(data.product_discount);
      this.f.product_category.setValue(data.product_category);
      this.product_image = data.product_image;
      console.log(data);
    })
  }

  get f() {
    return this.form.controls;
  }

}
