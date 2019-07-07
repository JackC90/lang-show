import { Validators } from '@angular/forms';
import { BaseField } from '../app.forms';

export const NEW_TASK_FORM: BaseField[] = [
  new BaseField({
    key: 'title',
    label: 'Title',
    type: 'text',
    validators: [
        Validators.required
    ]
  }),
  new BaseField({
    key: 'description',
    label: 'Description',
    type: 'textarea',
    validators: [
    ]
  }),
  new BaseField({
    value: new Date(),
    key: 'start_date',
    label: 'Start Date',
    type: 'datepicker',
    validators: [
        Validators.required
    ]
  }),
  new BaseField({
    value: new Date().toLocaleString(),
    key: 'deadline',
    label: 'Deadline',
    type: 'datepicker',
    validators: [
        Validators.required
    ]
  }),
  new BaseField({
    key: 'notes',
    label: 'Notes',
    type: 'text',
    validators: [
    ]
  }),
  new BaseField({
    value: 0,
    key: 'status',
    label: 'Status',
    type: 'select',
    validators: [
        Validators.required
    ]
  }),
  new BaseField({
    value: 1,
    key: 'language_id',
    label: 'Language',
    type: 'hidden',
    validators: [
        Validators.required
    ]
  })
];