import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminInventoryComponent } from './admin-inventory/admin-inventory.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  {
    path: "",
    component: LoginComponent
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "home",
    component: HomeComponent
  }, 
  {
    path: "adminInventory",
    component: AdminInventoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
