import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  formControlExample = new FormControl(null);
  formGroupExample!: FormGroup;
  ngModelExample?: string = undefined;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.formGroupExample = this.formBuilder.group({
      formArrayExample: this.formBuilder.array([
        this.formBuilder.control('30'),
        this.formBuilder.control('40'),
        this.formBuilder.control('50'),
      ]),
    });
  }

  get formArrayExample2() {
    return this.formGroupExample.get('formArrayExample') as FormArray;
  }
}
