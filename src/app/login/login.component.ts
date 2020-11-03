import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  returnUrl: string;
  constructor(private formBuilder: FormBuilder) { }

  OnSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
  }
    console.log("helloworld");
    console.log(this.f.email.value);
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email : ['', Validators.required],
      password : ['', Validators.required]
    });
  }
  get f() { return this.form.controls; }

}
