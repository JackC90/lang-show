import { Component, OnInit, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { CustomMaterialModule } from '../custom-material/custom-material.module';
import { ActivatedRoute } from "@angular/router";
import { WordService } from './word.service';
import { AppService } from '../app.service';
import { FormService, BaseField } from '../app.forms';
import { Word } from './word';
import { FormGroup } from '@angular/forms';
import { EDIT_WORD_FORM } from './word.forms';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.scss']
})
export class WordComponent implements OnInit {
  params;
  word: Word;
  wordApiUrl: string;
  editWordMode: boolean;
  wordFields: BaseField[];
  editWordForm: FormGroup;

  constructor( 
    private route: ActivatedRoute, 
    private wordService: WordService,
    private app: AppService,
    private form: FormService
  ) { 
  }

  ngOnInit() {
    this.editWordMode = false;
    this.wordFields = EDIT_WORD_FORM;

    this.wordService.wordData$.subscribe(data => {
      if (data) {
        this.word = data;
        this.wordApiUrl = "words/" + this.word.id;
      }
    });
  }

  editWord() {
    if (this.editWordMode) {
      this.editWordMode = false;
    } else {
      this.editWordForm = this.form.initComponentForm(EDIT_WORD_FORM, this.word);
      this.editWordMode = true;
    }  
  }

  updateWord() {
    this.app.update(this.wordApiUrl, this.editWordForm.value)
      .subscribe(data => {
        this.app.get(this.wordApiUrl, {})
          .subscribe((response) => {
            this.word = response;
            this.wordService.insertWord(this.word);
          })  
        this.editWordMode = false;
      })
  }
}
