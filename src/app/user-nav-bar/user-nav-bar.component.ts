import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';

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
  searchText : string;
  constructor(private router : Router, private formBuilder : FormBuilder, private sharedService : SharedService) { }

  onLogout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/']);
  }

  onSearch() {
    //this.sharedService.sendSearchResult(this.f.searchField.value);
    this.router.navigate(['/home']);
    //console.log(this.f.searchField.value);
  }
  
  Wishlist() {
    this.router.navigate(['/wishlist']);
  }

  PreOrders() {
    this.pre_orders = true;
    this.category = false;
    this.wishlist = false;
  }

  ngOnInit(): void {
    // this.form = this.formBuilder.group({
    //   searchField : [' ', Validators.required]
    // })
  }

  // get f() {
  //   return this.form.controls;
  // }

}
