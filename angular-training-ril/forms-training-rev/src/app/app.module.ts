import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FormsComponent } from './forms/forms.component';

import { HighlightModule } from 'ngx-highlightjs';
import { TemplateSampleComponent } from './forms/template-sample/template-sample.component';
import { ReactiveSampleComponent } from './forms/reactive-sample/reactive-sample.component';
import { NestedFormComponent } from './forms/nested-form/nested-form.component';

import { Routes, RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { ZipvalidatorDirective } from './zipvalidator.directive';


const routes: Routes = [
  {path: '', redirectTo: 'template', pathMatch: 'full'},
  {path: 'template', component: TemplateSampleComponent},
  {path: 'reactive', component: ReactiveSampleComponent},
  {path: 'nested', component: NestedFormComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FormsComponent,
    TemplateSampleComponent,
    ReactiveSampleComponent,
    NestedFormComponent,
    FooterComponent,
    ZipvalidatorDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    HighlightModule.forRoot({ theme: 'arduino-light'})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
