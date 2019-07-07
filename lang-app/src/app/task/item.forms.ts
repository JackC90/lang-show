import { Validators } from '@angular/forms';
import { BaseField } from '../app.forms';

export const EDIT_ITEM_FORM: BaseField[] = [
  new BaseField({
    key: 'description',
    label: 'Description',
    type: 'textarea',
    validators: [
        Validators.required
    ]
  }),
  new BaseField({
    key: 'is_done',
    label: 'Done',
    type: 'check',
    validators: [
    ]
  })
];