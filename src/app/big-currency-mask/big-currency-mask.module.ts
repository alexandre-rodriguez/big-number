import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BigCurrencyMaskDirective } from './big-currency-mask.directive';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [BigCurrencyMaskDirective],
  imports: [CommonModule, FormsModule],
  exports: [BigCurrencyMaskDirective],
})
export class BigCurrencyMaskModule {}
