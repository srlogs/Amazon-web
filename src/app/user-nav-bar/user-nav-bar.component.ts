import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-nav-bar',
  templateUrl: './user-nav-bar.component.html',
  styleUrls: ['./user-nav-bar.component.css']
})
export class UserNavBarComponent implements OnInit {
  form : FormGroup;
  searchField : string;
  category : boolean = false;
  wishlist : boolean = false;
  pre_orders : boolean = false;
  constructor(private router : Router, private formBuilder : FormBuilder) { }

  onLogout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/']);
  }

  onSearch() {
    if(this.category === true) {
      console.log("category",this.category);
    }
    else if(this.wishlist === true) {
      console.log("wishlist",this.wishlist);
    }
    else {
      console.log("previous orders",this.pre_orders);
    }
    console.log(this.f.searchField.value);
  }
  Category() {
    this.category = true;
    this.wishlist = false;
    this.pre_orders = false;
  }
  Wishlist() {
    this.wishlist = true;
    this.category = false;
    this.pre_orders = false;
  }

  PreOrders() {
    this.pre_orders = true;
    this.category = false;
    this.wishlist = false;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      searchField : [' ', Validators.required]
    })
  }

  get f() {
    return this.form.controls;
  }

}
