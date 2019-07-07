import { Validators } from '@angular/forms';
import { BaseField } from '../app.forms';

export const EDIT_TASK_FORM: BaseField[] = [
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
    key: 'start_date',
    label: 'Start Date',
    type: 'datepicker',
    validators: [
        Validators.required
    ]
  }),
  new BaseField({
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
    key: 'status',
    label: 'Status',
    type: 'select',
    validators: [
        Validators.required
    ]
  }),
  new BaseField({
    key: 'language_id',
    label: 'Language',
    type: 'hidden',
    validators: [
        Validators.required
    ]
  })
];