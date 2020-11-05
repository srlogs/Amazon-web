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
  }, 
  {
    path: "addItem",
    component: AddItemComponent
  },
  {
    path: "updateItem",
    component: UpdateItemComponent
  },
  {
    path: "cart",
    component: CartDataComponent
  },
  {
    path: "wishlist",
    component: WishlistComponent
  },
  {
    path: "buyProduct",
    component: BuyProductComponent
  },
  {
    path: "previousOrders",
    component: PreviousOrdersComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
