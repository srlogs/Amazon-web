import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {
  users: any;
  form: FormGroup;
  submitted = false;
  returnUrl: string;
  inCorrect = false;
  admin_username: string = "admin";
  admin_password: string = "admin@ecom";
  constructor(private formBuilder: FormBuilder, private router: Router, private elementRef : ElementRef) { }

  OnSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.users = JSON.parse(localStorage.getItem('users')) || [];
    let user = this.users.find(x => x.email === this.f.email.value && x.password === this.f.password.value);
    if (!user) {
      if (this.admin_username === this.f.email.value && this.admin_password === this.f.password.value) {
        localStorage.setItem('admin', 'true');
        this.router.navigate(['/adminInventory']);
      }
      else {
        this.inCorrect = true;
        return;
      }
    }
    else {
      localStorage.setItem('currentUser', this.f.email.value);
      this.router.navigate(['/home']);
    } 
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'white';
  }
  get f() { return this.form.controls; }

}
