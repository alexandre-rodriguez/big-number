import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BigCurrencyMaskModule } from './big-currency-mask/big-currency-mask.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BigCurrencyMaskModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
