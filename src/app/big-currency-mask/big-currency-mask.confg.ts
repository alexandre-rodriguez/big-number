import { InjectionToken } from '@angular/core';

export interface BigCurrencyMaskConfig {
  align?: string;
  allowNegative?: boolean;
  decimal?: string;
  precision?: number;
  prefix?: string;
  suffix?: string;
  thousands?: string;
}

export let BIG_CURRENCY_MASK_CONFIG = new InjectionToken<BigCurrencyMaskConfig>(
  'big.currency.mask.config'
);
