import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableComponent } from './table/table.component';
import { DataService } from './shared/data.service';
import { DialogComponent } from './table/dialog/dialog.component';
import { ErrordialogComponent } from './table/errordialog/errordialog.component';
import { FormatOdate } from './formatodate.pipe';

@NgModule({
  declarations: [AppComponent, TableComponent, DialogComponent, ErrordialogComponent, FormatOdate],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
  ],
  providers: [DataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
