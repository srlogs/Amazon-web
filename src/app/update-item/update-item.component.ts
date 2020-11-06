import { Component, OnInit } from '@angular/core';
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
  constructor(private adminInventory: AdminInventoryComponent, private sharedService: SharedService, private formBuilder: FormBuilder, private router : Router) { }

  onSubmit() {
    this.submitted = true;
    if(this.form.invalid) {
      return;
    }
    this.products = JSON.parse(localStorage.getItem('productData'));
    this.products.find(x => {
      if (x.product_name === this.f.product_name.value && x.product_price === this.f.product_price.value && x.product_description === this.f.product_description.value) {
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
      product_name: ['', Validators.required],
      product_quantity: ['', Validators.required],
      product_price: ['', Validators.required],
      product_description: ['', Validators.required],
      product_discount: [' ', Validators.required],
      product_category : ['', Validators.required]
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
