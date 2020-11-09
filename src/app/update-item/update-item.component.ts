import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminInventoryComponent } from '../admin-inventory/admin-inventory.component';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.component.html',
  styleUrls: ['./update-item.component.css']
})
export class UpdateItemComponent implements OnInit {
  productData: any;
  form: FormGroup;
  selectedFile: File = null;
  products: any;
  product_image: any;
  searchText : string;
  submitted = false;
  p_name : string;
  p_quantity : number;
  p_price : number;
  p_description : string;
  p_discount : number;
  p_category : string;

  constructor(private adminInventory: AdminInventoryComponent, private sharedService: SharedService, private formBuilder: FormBuilder, private router : Router, private elementRef : ElementRef) { }

  onSubmit() {
    this.submitted = true;
    if(this.form.invalid) {
      return;
    }
    this.products = JSON.parse(localStorage.getItem('productData'));
    this.products.find(x => {
      if (x.product_name === this.p_name && x.product_price === this.p_price && x.product_description === this.p_description) {
        x.product_quantity = this.f.product_quantity.value;
        x.product_discount = this.f.product_discount.value;
      }
    })

    localStorage.setItem('productData', JSON.stringify(this.products));
    window.alert("Product data updated");
    this.router.navigate(['/adminInventory']);
  }

  onLogout() {
    localStorage.removeItem('admin');
    this.router.navigate(['/']);
  }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      product_quantity: ['', Validators.required],
      product_discount: ['', Validators.required],
    })



    this.sharedService.currentData.subscribe(data => {
      // this.f.product_name.setValue(data.product_name);
      // this.f.product_quantity.setValue(data.product_quantity);
      // this.f.product_price.setValue(data.product_price);
      // this.f.product_description.setValue(data.product_description);
      // this.f.product_discount.setValue(data.product_discount);
      // this.f.product_category.setValue(data.product_category);
      this.p_name = data.product_name;
      this.f.product_quantity.setValue(data.product_quantity);
      this.p_category = data.product_category;
      this.p_price = data.product_price;
      this.f.product_discount.setValue(data.product_discount);
      this.p_description = data.product_description;
      this.product_image = data.product_image;
      console.log(data);
    })
  }

  // ngAfterViewInit() {

  // }

  get f() {
    return this.form.controls;
  }

}
