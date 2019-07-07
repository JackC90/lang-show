import { Injectable, EventEmitter, Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs/Subject';

export class BaseField {
  value:      any;
  key:        string;
  label:      string;
  type:       string;
  validators: any[];

  constructor(options: {
    value?:      any,
    key?:        string,
    label?:      string,
    type?:       string,
    validators?: any[],
  } = {}) {
    this.value       = options.value;
    this.key         = options.key || '';
    this.label       = options.label || '';
    this.validators  = options.validators === undefined ? [] : options.validators;
    this.type        = options.type || '';
  }
}

@Injectable()
export class FormService {
  constructor() { }

  // Create forms for Components
  public initComponentForm(fields: BaseField[], values) {
    let formGroup = this._createComponentFormGroup(fields);
    if (values) {
      formGroup.patchValue(values);
    }
    return formGroup;  
  }

  private _createComponentFormGroup(fields) {
    let group: any = {};
    fields.forEach(field => {
      group[field.key] = new FormControl(field.value, field.validators);
    });
    return new FormGroup(group);
  }

  public showError(formGroup, formControlName: string) {
    let formControl = formGroup.controls[formControlName];
    if (!formControl.valid && formControl.errors) {
      return formControl.errors;
    } else {
      return null;
    };
  }
}
