import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit, AfterViewInit, OnDestroy {
  products: any = [];
  allProducts: any;
  currentUser: any;
  cart_data: any;
  searchText : string;
  isEmpty : boolean = false;
  constructor(private router: Router, private elementRef : ElementRef) { }

  onLogout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/']);
  }

  Wishlist() {
    this.router.navigate(['/wishlist']);
  }


  PreOrders() {
    this.router.navigate(['/previousOrders']);
  }

  toCart(data) {
    this.allProducts = JSON.parse(localStorage.getItem('cartData')) || [];
    let product = this.allProducts.find(x => x.cart_user === this.currentUser && x.product_name === data.product_name && x.product_description === data.product_description && x.product_price === data.product_price);
    if (product) {
      localStorage.setItem('cartData', JSON.stringify(this.allProducts));
    }
    else {
      const cartData = {
        product_name: data.product_name,
        product_price: data.product_price,
        product_description: data.product_description,
        product_discount: data.product_discount,
        product_image: data.product_image,
        product_category : data.product_category,
        cart_user: this.currentUser,
        product_quantity : data.product_quantity
      }
      this.allProducts.push(cartData);
      console.log(this.allProducts);
      localStorage.setItem('cartData', JSON.stringify(this.allProducts));
    }
    this.router.navigate(['/cart']);
  }

  toRemove(data) {
    var currentUser = localStorage.getItem('currentUser');
    this.allProducts = JSON.parse(localStorage.getItem('wishlist')) || [];
    let index = this.allProducts.findIndex(x => x.cart_user === currentUser && x.product_name === data.product_name && x.product_description === data.product_description && x.product_price === data.product_price);
    this.allProducts.splice(index, 1);
    localStorage.setItem('wishlist', JSON.stringify(this.allProducts));
    this.allProducts = JSON.parse(localStorage.getItem('wishlist')) || [];
    console.log(this.allProducts);
    this.products = [];
    this.allProducts.find(x => {
      if (x.cart_user === currentUser) {
        this.products.push(x);
      }
    })
    if(this.products.length === 0) {
      this.isEmpty = true;
    }
    //window.location.reload();
  }

  ngOnInit(): void {
    this.currentUser = localStorage.getItem('currentUser');
    this.allProducts = JSON.parse(localStorage.getItem('wishlist')) || [];
    this.allProducts.find(x => {
      if (x.cart_user === this.currentUser) {
        this.products.push(x);
        //console.log(this.products);
      }
    })
    if(this.products.length === 0) {
      this.isEmpty = true;
    }
  }

  ngOnDestroy() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#fa6e91';
  }  

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#f7b3c4';
  }
}
