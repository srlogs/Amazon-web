import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  users : any;
  form: FormGroup;
  submitted = false;
  returnUrl: string;
  inCorrect = false;
  constructor(private formBuilder: FormBuilder, private router : Router) { }

  OnSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
  }
    this.users = JSON.parse(localStorage.getItem('users')) || [];
    let user = this.users.find(x => x.email === this.f.email.value && x.password === this.f.password.value);
    if(!user) {
      this.inCorrect = true;
      return;
    }
    this.router.navigate(['/home']);
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email : ['', Validators.required],
      password : ['', Validators.required]
    });
  }
  get f() { return this.form.controls; }

}
