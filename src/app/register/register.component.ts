import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // username : string;
  // email : string;
  // password : string;
  // phone : string;
  submitted = false;
  form : FormGroup;
  returnUrl : string;
  constructor(private formBuilder : FormBuilder) { }
  addUserData() {
    this.submitted = true;

    if(this.form.invalid) {
      return;
    }
  }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name : [' ', Validators.required],
      phone : [' ', Validators.required],
      email : [' ', Validators.required],
      password : [' ', Validators.required]
    })

    this.returnUrl = '/';
  }

  get f() {
    return this.form.controls;
  }

}
