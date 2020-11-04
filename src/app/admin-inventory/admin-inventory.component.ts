import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { SharedService } from '../shared.service';

@Injectable({providedIn: 'root'})
@Component({
  selector: 'app-admin-inventory',
  templateUrl: './admin-inventory.component.html',
  styleUrls: ['./admin-inventory.component.css']
})
export class AdminInventoryComponent implements OnInit {

  private subject = new Subject<any>();
  products : any;
  constructor(private router : Router, private sharedService : SharedService) { 
  }

  onUpdate(data) {
    this.sharedService.sendProductData(data);
    this.router.navigate(['/updateItem']);
  }

  getData() : Observable<any> {
    return this.subject.asObservable();
  }


  ngOnInit(): void {
    this.products = JSON.parse(localStorage.getItem('productData'));
  }

}
