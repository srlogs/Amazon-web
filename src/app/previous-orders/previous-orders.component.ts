import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-previous-orders',
  templateUrl: './previous-orders.component.html',
  styleUrls: ['./previous-orders.component.css']
})
export class PreviousOrdersComponent implements OnInit {

  searchText : string;
  products : any = [];
  allProducts : any = [];
  isEmpty : boolean = false;
  constructor(private router: Router, private sharedService : SharedService) { }

  toBuy(data) {
    this.sharedService.sendProductData(data);
    this.router.navigate(['/buyProduct']);
  }

  Wishlist() {
    this.router.navigate(['/wishlist']);
  }

  PreOrders() {
    this.router.navigate(['/previousOrders']);
  }

  onLogout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    this.products = [];
    this.allProducts = JSON.parse(localStorage.getItem('orders'));
    this.allProducts.find(x => {
      if(x.cart_user === localStorage.getItem('currentUser')) {
        this.products.push(x);
      }
    })
    if(this.products.length === 0) {
      this.isEmpty = true;
    }
    console.log(this.products);
  }

}
