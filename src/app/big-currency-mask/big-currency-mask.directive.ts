import { InputHandler } from './input.handler';
import { BigNumber } from 'bignumber.js';
import {
  BIG_CURRENCY_MASK_CONFIG,
  BigCurrencyMaskConfig,
} from './big-currency-mask.confg';
import {
  AfterViewInit,
  Directive,
  DoCheck,
  ElementRef,
  forwardRef,
  HostListener,
  Inject,
  Input,
  KeyValueDiffer,
  KeyValueDiffers,
  OnInit,
  Optional,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';

export const BIGCURRENCYMASKDIRECTIVE_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => BigCurrencyMaskDirective),
  multi: true,
};

@Directive({
  selector: '[bigCurrencyMask]',
  providers: [
    BIGCURRENCYMASKDIRECTIVE_VALUE_ACCESSOR,
    {
      provide: NG_VALIDATORS,
      useExisting: BigCurrencyMaskDirective,
      multi: true,
    },
  ],
})
export class BigCurrencyMaskDirective
  implements AfterViewInit, ControlValueAccessor, DoCheck, OnInit, Validator
{
  @Input() max?: string;
  @Input() min?: string;
  @Input() options?: BigCurrencyMaskConfig;

  inputHandler!: InputHandler;
  keyValueDiffer!: KeyValueDiffer<any, any>;

  optionsTemplate: BigCurrencyMaskConfig = {
    align: 'right',
    allowNegative: true,
    decimal: '.',
    precision: 2,
    prefix: '$ ',
    suffix: '',
    thousands: ',',
  };

  constructor(
    @Optional()
    @Inject(BIG_CURRENCY_MASK_CONFIG)
    private currencyMaskConfig: BigCurrencyMaskConfig,
    private elementRef: ElementRef,
    private keyValueDiffers: KeyValueDiffers
  ) {
    if (currencyMaskConfig) {
      this.optionsTemplate = currencyMaskConfig;
    }

    this.keyValueDiffer = keyValueDiffers.find({}).create();
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.style.textAlign = this.options?.align
      ? this.options.align
      : this.optionsTemplate.align;
  }

  ngDoCheck() {
    if (this.keyValueDiffer.diff(this.options!)) {
      this.elementRef.nativeElement.style.textAlign = this.options?.align
        ? this.options.align
        : this.optionsTemplate.align;
      this.inputHandler.updateOptions(
        (<any>Object).assign({}, this.optionsTemplate, this.options)
      );
    }
  }

  ngOnInit() {
    this.inputHandler = new InputHandler(
      this.elementRef.nativeElement,
      (<any>Object).assign({}, this.optionsTemplate, this.options)
    );
  }

  @HostListener('blur', ['$event'])
  handleBlur(event: any) {
    this.inputHandler.getOnModelTouched().apply(event);
  }

  @HostListener('click', ['$event'])
  handleClick(event: any) {
    this.inputHandler.handleClick(event, this.isChromeAndroid());
  }

  @HostListener('cut', ['$event'])
  handleCut(event: any) {
    if (!this.isChromeAndroid()) {
      this.inputHandler.handleCut(event);
    }
  }

  @HostListener('input', ['$event'])
  handleInput(event: any) {
    if (this.isChromeAndroid()) {
      this.inputHandler.handleInput(event);
    }
  }

  @HostListener('keydown', ['$event'])
  handleKeydown(event: any) {
    if (!this.isChromeAndroid()) {
      this.inputHandler.handleKeydown(event);
    }
  }

  @HostListener('keypress', ['$event'])
  handleKeypress(event: any) {
    if (!this.isChromeAndroid()) {
      this.inputHandler.handleKeypress(event);
    }
  }

  @HostListener('keyup', ['$event'])
  handleKeyup(event: any) {
    if (!this.isChromeAndroid()) {
      this.inputHandler.handleKeyup(event);
    }
  }

  @HostListener('paste', ['$event'])
  handlePaste(event: any) {
    if (!this.isChromeAndroid()) {
      this.inputHandler.handlePaste(event);
    }
  }

  isChromeAndroid(): boolean {
    return (
      /chrome/i.test(navigator.userAgent) &&
      /android/i.test(navigator.userAgent)
    );
  }

  registerOnChange(callbackFunction: Function): void {
    this.inputHandler.setOnModelChange(callbackFunction);
  }

  registerOnTouched(callbackFunction: Function): void {
    this.inputHandler.setOnModelTouched(callbackFunction);
  }

  setDisabledState(value: boolean): void {
    this.elementRef.nativeElement.disabled = value;
  }

  validate(abstractControl: AbstractControl): { [key: string]: any } {
    let result: any = {};

    const value = new BigNumber(abstractControl.value);

    if (this.max) {
      const maxValue = new BigNumber(this.max);

      if (value.isGreaterThan(maxValue)) {
        result.max = true;
      }
    }

    if (this.min) {
      const minValue = new BigNumber(this.min);

      if (value.isLessThan(minValue)) {
        result.min = true;
      }
    }

    return result != {} ? result : null;
  }

  writeValue(value: string): void {
    this.inputHandler.setValue(value);
    setTimeout(() => {
      this.inputHandler.updateModel();
    }, 0);
  }
}
