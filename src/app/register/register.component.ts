import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  submitted = false;
  form: FormGroup;
  returnUrl: string;
  users: any;
  existed = false;
  constructor(private formBuilder: FormBuilder, private router : Router) { }
  addUserData() {
    // array in local storage for registered users
    this.users = JSON.parse(localStorage.getItem('users')) || [];
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    var formData = {
      name: this.f.name.value,
      phone: this.f.phone.value,
      email: this.f.email.value,
      password: this.f.password.value
    }

    if (this.users.find(x => x.email === this.f.email.value)) {
      console.log("user already exists");
      this.existed = true;
      return;
    }

    this.users.push(formData);
    localStorage.setItem('users', JSON.stringify(this.users));
    console.log(this.f.name.value);

    this.router.navigate([this.returnUrl]);


  }
  ngOnInit(): void {

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      phone: ['', Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.returnUrl = '/';
  }

  get f() {
    return this.form.controls;
  }

}
