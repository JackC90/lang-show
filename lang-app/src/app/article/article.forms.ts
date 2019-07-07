import { Validators } from '@angular/forms';
import { BaseField } from '../app.forms';

export const EDIT_ARTICLE_FORM: BaseField[] = [
  new BaseField({
    key: 'title',
    label: 'Title',
    type: 'textarea',
    validators: [
      Validators.required
    ]
  }),
  new BaseField({
    key: 'body',
    label: 'Body',
    type: 'textarea',
    validators: [
    ]
  }),
  new BaseField({
    key: 'source_url',
    label: 'Source URL',
    type: 'textarea',
    validators: [
    ]
  })
];

export const EXTRACT_ARTICLE_FORM: BaseField[] = [
  new BaseField({
    key: 'source_url',
    label: 'Source URL',
    type: 'textarea',
    validators: [
      Validators.required
    ]
  }),
  new BaseField({
    key: 'extract_body',
    label: 'Extract text body',
    type: 'checkbox',
    validators: [
    ]
  })
];