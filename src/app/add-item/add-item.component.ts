import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  @ViewChild('myInput')
  myInputVariable : ElementRef

  selectedFile : File = null;
  form : FormGroup;
  productData : any;
  imageData : any;
  isSuccess : boolean = false;
  pname : string;
  pquantity : string;
  pprice : string;
  pdesc : string;
  pdisc : string;
  pcat : string;
  submitted = false;
  searchText : string;
  constructor(private formBuilder : FormBuilder, private router : Router) { }

  onFileSelected(event) {
    this.selectedFile = <File> event.target.files[0];
    console.log(this.selectedFile);
  }

  onSubmit() {
    this.submitted = true;
    if(this.form.invalid) {
      return;
    }
    this.productData = JSON.parse(localStorage.getItem('productData')) || [];
    let len = this.productData.length;
    this.pname = this.f.product_name.value;
    this.pquantity = this.f.product_quantity.value;
    this.pprice = this.f.product_price.value;
    this.pdesc = this.f.product_description.value;
    this.pdisc = this.f.product_discount.value;
    this.pcat = this.f.product_category.value;

    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.addEventListener('load', () => {
      this.imageData = reader.result;
      let product_data = {
        product_name : this.pname,
        product_quantity : this.pquantity,
        product_price : this.pprice,
        product_description : this.pdesc,
        product_discount : this.pdisc,
        product_category : this.pcat,
        product_image : this.selectedFile.name
      }
      this.productData.push(product_data);
      localStorage.setItem('productData', JSON.stringify(this.productData));
      console.log(product_data);
    })
    this.router.navigate(['/adminInventory']);
    this.form.reset();
    console.log(this.myInputVariable.nativeElement.value);
    this.myInputVariable.nativeElement.value = "";
  }

  onLogout() {
    localStorage.removeItem('admin');
    this.router.navigate(['/']);
  }

  setValueNull() {
    this.form.reset();
  }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      product_name : ['', Validators.required],
      product_quantity : ['', Validators.required],
      product_price : ['', Validators.required],
      product_description : ['', Validators.required],
      product_discount : ['', Validators.required],
      product_category : ['', Validators.required],
      imageInput : ['', Validators.required]
    })
  }

  get f() {
    return this.form.controls;
  }

}
