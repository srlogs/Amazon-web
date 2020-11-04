import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  search : string;
  constructor(private router : Router) { }
  onLogout() {
    localStorage.removeItem('admin');
    this.router.navigate(['/']);
  }

  onSearch() {
    console.log(this.search);
  }
  
  ngOnInit(): void {
  }

}
