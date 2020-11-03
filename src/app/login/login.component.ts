import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email : string;
  password : string;
  invalid : boolean = false;
  constructor() { }

  authenticateData() {
    console.log("login successfull!");
  }

  ngOnInit(): void {
  }

}
