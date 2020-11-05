import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddItemComponent } from './add-item/add-item.component';
import { AdminInventoryComponent } from './admin-inventory/admin-inventory.component';
import { BuyProductComponent } from './buy-product/buy-product.component';
import { CartDataComponent } from './cart-data/cart-data.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PreviousOrdersComponent } from './previous-orders/previous-orders.component';
import { RegisterComponent } from './register/register.component';
import { UpdateItemComponent } from './update-item/update-item.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { AuthGuard } from '../app/auth.guard'; 
import { AuthGuardAdmin } from '../app/auth.guard.admin';

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
    component: HomeComponent,
    canActivate: [AuthGuard]
  }, 
  {
    path: "adminInventory",
    component: AdminInventoryComponent,
    canActivate: [AuthGuardAdmin]
  }, 
  {
    path: "addItem",
    component: AddItemComponent,
    canActivate: [AuthGuardAdmin]
  },
  {
    path: "updateItem",
    component: UpdateItemComponent,
    canActivate: [AuthGuardAdmin]
  },
  {
    path: "cart",
    component: CartDataComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "wishlist",
    component: WishlistComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "buyProduct",
    component: BuyProductComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "previousOrders",
    component: PreviousOrdersComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
