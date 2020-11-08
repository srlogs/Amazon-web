import { Route } from '@angular/compiler/src/core';
import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-cart-data',
  templateUrl: './cart-data.component.html',
  styleUrls: ['./cart-data.component.css']
})
export class CartDataComponent implements OnInit, AfterViewInit {
  allProducts: any;
  products: any = [];
  searchText : string;
  isEmpty : boolean = false;
  constructor(private router: Router, private sharedService : SharedService, private elementRef : ElementRef) { }

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

  toRemove(data) {
    this.allProducts = JSON.parse(localStorage.getItem('cartData'));
    var currentUser = localStorage.getItem('currentUser');
    let index = this.allProducts.findIndex(x => x.cart_user === currentUser && x.product_name === data.product_name && x.product_description === data.product_description && x.product_price === data.product_price);
    this.allProducts.splice(index, 1);
    localStorage.setItem('cartData', JSON.stringify(this.allProducts));
    this.allProducts = JSON.parse(localStorage.getItem('cartData')) || [];
    this.products = [];
    this.allProducts.find(x => {
      if (x.cart_user === currentUser) {
        this.products.push(x);
      }
    })
    console.log(this.products);
    if(this.products.length === 0) {
      this.isEmpty = true;
    }
  }

  ngOnInit(): void {
    var currentUser = localStorage.getItem('currentUser');
    this.allProducts = JSON.parse(localStorage.getItem('cartData')) || [];
    this.allProducts.find(x => {
      if (x.cart_user === currentUser) {
        this.products.push(x);
      }
    })
    this.allProducts = JSON.parse(localStorage.getItem('productData')) ||[];
    for(let i = 0; i < this.products.length; ++i) {
        this.allProducts.find(x => {
          if(x.product_name === this.products[i].product_name && x.product_category === this.products[i].product_category && x.product_description === this.products[i].product_description) {
              this.products[i].product_discount = x.product_discount;
          }
        })
    }

    console.log(this.products);
    if(this.products.length === 0) {
      this.isEmpty = true;
    }
  }
  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#ADA5FF';
  }
}
