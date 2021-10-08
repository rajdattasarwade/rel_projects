import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductAlertsComponent } from './product-alerts/product-alerts.component';
import { CartComponent } from './cart/cart.component';
import { HttpClientModule } from '@angular/common/http';
import { ShippingComponent } from './shipping/shipping.component';
import { FlyingHeroesComponent } from './flying-heroes/flying-heroes.component';
import { FlyingHeroesPipe } from './flying-heroes/flying-heroes.pipe';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: ProductListComponent },
      { path: 'product/:productId', component: ProductDetailsComponent},
      { path: 'cart', component: CartComponent},
      { path: 'shipping', component: ShippingComponent },
      { path: 'flying-heroes', component: FlyingHeroesComponent },
    ]),
    HttpClientModule
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    ProductListComponent,
    ProductAlertsComponent,
    ProductDetailsComponent,
    CartComponent,
    ShippingComponent,
    FlyingHeroesComponent,
    FlyingHeroesPipe
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }