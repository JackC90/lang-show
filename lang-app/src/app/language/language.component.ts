import { Component, OnInit, Inject } from '@angular/core';
import { CustomMaterialModule } from '../custom-material/custom-material.module';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppService } from '../app.service';
import { LanguageService } from '../language/language.service';
import { FormService, BaseField } from '../app.forms';
import { Language } from './language';
import { Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})

export class LanguageComponent implements OnInit {
  languageFields: BaseField[];
  languageForm: FormGroup;
  language: Language;

  constructor(
    public dialogRef: MatDialogRef<LanguageComponent>,
    private app: AppService,
    private languageService: LanguageService,
    private form: FormService,
    @Inject(MAT_DIALOG_DATA) public languages: Language[]
  ) { 
  }

  ngOnInit() {
    this.languageFields = [
      new BaseField({
        key: 'id',
        label: 'Language',
        validators: [
            Validators.required
        ]
      })
    ];
    this.languageForm = this.form.initComponentForm(this.languageFields, {id: 1});
  }

  updateLanguage(): void {
    let setLanguage = this.languages.filter((language) => { return language.id === this.languageForm.value.id; })[0];
    this.languageService.insertLanguage(setLanguage);
    this.dialogRef.close();
  }
}
