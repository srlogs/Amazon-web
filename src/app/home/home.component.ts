import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products : any;
  constructor(private http : HttpClient) { }
  


  ngOnInit(): void {
    this.products = JSON.parse(localStorage.getItem('productData'));
  }

}
