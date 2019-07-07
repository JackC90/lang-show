import { Validators } from '@angular/forms';
import { BaseField } from '../app.forms';

export const EDIT_SENTENCE_FORM: BaseField[] = [
  new BaseField({
    key: 'text',
    label: 'Text',
    type: 'textarea',
    validators: [
        Validators.required
    ]
  }),
  new BaseField({
    key: 'note',
    label: 'Note',
    type: 'textarea',
    validators: [
    ]
  }),
  new BaseField({
    key: 'reference',
    label: 'Reference',
    type: 'text',
    validators: [
    ]
  }),
  new BaseField({
    key: 'source_url',
    label: 'Source Url',
    type: 'text',
    validators: [
    ]
  })
];