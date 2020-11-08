import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval, Observable, Subject, Subscription } from 'rxjs';
import { Injectable } from '@angular/core';
import { SharedService } from '../shared.service';

@Injectable({providedIn: 'root'})
@Component({
  selector: 'app-admin-inventory',
  templateUrl: './admin-inventory.component.html',
  styleUrls: ['./admin-inventory.component.css']
})
export class AdminInventoryComponent implements OnInit, AfterViewInit {

  private subject = new Subject<any>();
  products : any;
  searchText : string;
  isEmpty : boolean = false;
  subscription : Subscription;
  constructor(private router : Router, private sharedService : SharedService, private elementRef : ElementRef) { 
  }

  onLogout() {
    localStorage.removeItem('admin');
    this.router.navigate(['/']);
  }

  onUpdate(data) {
    this.sharedService.sendProductData(data);
    this.router.navigate(['/updateItem']);
  }

  getData() : Observable<any> {
    return this.subject.asObservable();
  }

  refreshFunction() {
    this.products = JSON.parse(localStorage.getItem('productData')) || [];
    if(this.products.length === 0) {
      this.isEmpty = true;
    }
  }

  ngOnInit(): void {
    this.products = JSON.parse(localStorage.getItem('productData')) || [];
    if(this.products.length === 0) {
      this.isEmpty = true;
    }
    console.log(this.products);
    const source = interval(1000);
    this.subscription = source.subscribe(val => this.refreshFunction);
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#ebf7eb';
  }


}
