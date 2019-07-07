import { Validators } from '@angular/forms';
import { BaseField } from '../app.forms';

export const EDIT_WORD_FORM: BaseField[] = [
  new BaseField({
    key: 'text',
    label: 'Text',
    type: 'text',
    validators: [
        Validators.required
    ]
  }),
  new BaseField({
    key: 'alt_text',
    label: 'Traditional',
    type: 'text',
    validators: [
    ]
  }),
  new BaseField({
    key: 'pinyin',
    label: 'Pinyin',
    type: 'text',
    validators: [
    ]
  }),
  new BaseField({
    key: 'meaning',
    label: 'Meaning',
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
  })
];