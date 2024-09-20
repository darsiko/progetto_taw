import { Routes } from '@angular/router';
import { HomepageComponent } from './screens/homepage/homepage.component';
import { LoginComponent } from './screens/login/login.component';
import { RegisterComponent } from './screens/register/register.component';
import { CartComponent } from './screens/cart/cart.component';
import { DetailprodComponent } from './screens/detailprod/detailprod.component';

export const routes: Routes = [

    {path: 'detailprod', component: DetailprodComponent},
    {path: 'home', component: HomepageComponent},
    {path: 'cart', component: CartComponent},
    {path: 'register', component: RegisterComponent},
    {path: '',  redirectTo: 'home', pathMatch:'full'},
    { path: 'login', component: LoginComponent },
];
