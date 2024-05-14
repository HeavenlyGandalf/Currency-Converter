import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { CurrencyItemComponent } from '../currency-item/currency-item.component';
import { CurrencyListComponent } from '../currency-list/currency-list.component';
import { AddCurrencyComponent } from '../add-currency/add-currency.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CurrencyListComponent,
    CurrencyItemComponent,
    AddCurrencyComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, MaterialModule, FormsModule],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(),
    ReactiveFormsModule,
  ],
  bootstrap: [AppComponent],
  exports: [MaterialModule],
})
export class AppModule {}
