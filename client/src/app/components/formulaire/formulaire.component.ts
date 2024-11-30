import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
})
export class FormulaireComponent implements OnInit {
  @Input() fields: any[] = [];
  @Output() submit = new EventEmitter<any>();
  @Input() groupValidators: ValidatorFn | null = null;
  @Input() isLoading = false;

  form!: FormGroup;
  today: string = new Date().toISOString().slice(0, 16);

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    const controls: any = {};
    this.fields.forEach((field) => {
      controls[field.name] = [field.value || '', field.validators || []];
    });
    this.form = this.fb.group(controls, { validators: this.groupValidators });
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.form.get(fieldName);
    return control ? control.invalid && control.touched : false;
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.submit.emit(this.form.value);
      console.log('Données du formulaire :', this.form.value);
    }
  }
}
