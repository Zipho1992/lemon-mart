import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth/auth-guard.service';
import { CategoriesComponent } from './inventory/categories/categories.component';
import { HomeComponent } from './home/home.component';
import { InventoryComponent } from './inventory/inventory.component';
import { InventoryHomeComponent } from './inventory/inventory-home/inventory-home.component';
import { LoginComponent } from './login/login.component';
import { ManagerComponent } from './manager/manager.component';
import { ManagerHomeComponent } from './manager/manager-home/manager-home.component';
import { NgModule } from '@angular/core';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductsComponent } from './inventory/products/products.component';
import { ReceiptLookupComponent } from './manager/receipt-lookup/receipt-lookup.component';
import { Role } from './auth/auth.enum';
import { StockEntryComponent } from './inventory/stock-entry/stock-entry.component';
import { UserManagementComponent } from './manager/user-management/user-management.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  {
    path: 'manager',
    component: ManagerComponent,
    canLoad: [AuthGuard],
    children: [
      { path: '', redirectTo: '/manager/home', pathMatch: 'full'},
      { path: 'home', component: ManagerHomeComponent},
      { path: 'users', component: UserManagementComponent},
      { path: 'receipts', component: ReceiptLookupComponent, canActivate: [AuthGuard], data: { expectedRole: Role.Manager}},
    ],
  },
  {
    path:'inventory',
    component: InventoryComponent,
    children: [
      { path: '', redirectTo: '/inventory/home', pathMatch: 'full'},
      { path: 'home', component: InventoryHomeComponent },
      { path: 'stock-entry', component: StockEntryComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'categories', component: CategoriesComponent },
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'login/:redirectUrl', component: LoginComponent},
  { path: '***', component: PageNotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
