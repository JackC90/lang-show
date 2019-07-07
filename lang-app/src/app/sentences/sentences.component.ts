import { Component, OnInit, Input } from '@angular/core';
import { CustomMaterialModule } from '../custom-material/custom-material.module';
import { FormGroup, FormControl, FormArray, NgForm } from '@angular/forms';
import { ActivatedRoute } from "@angular/router";
import { WordService } from '../word/word.service';
import { ArticleService } from '../article/article.service';
import { AppService } from '../app.service';
import { FormService, BaseField } from '../app.forms';
import { Sentence } from './sentence';
import { EDIT_SENTENCE_FORM } from './sentences.forms';

@Component({
  selector: 'app-sentences',
  templateUrl: './sentences.component.html',
  styleUrls: ['./sentences.component.scss']
})
export class SentencesComponent implements OnInit {
  @Input() word;
  newSentenceMode: boolean;
  editSentenceId: number;
  sentencesApiUrl: string;
  wordApiUrl: string;

  sentenceFields: BaseField[];
  sentenceForm: FormGroup;

  sourceInfo: object; 

  constructor(
    private route: ActivatedRoute, 
    private wordService: WordService,
    private app: AppService,
    private form: FormService,
    private articleService: ArticleService
  ) { 
    this.articleService.articleData$
      .subscribe(data => {
        if (data) {
          return this.sourceInfo = {
            reference: data.title,
            source_url: data.source_url
          }
        } else {
          return null;
        }
      })
  }

  ngOnInit() {
    this.wordApiUrl = "words/" + this.word.id;
    this.sentencesApiUrl = "words/" + this.word.id + "/sentences";
    this.sentenceFields = EDIT_SENTENCE_FORM;
    this.newSentenceMode = false;
    this.editSentenceId = null;
  }

  newSentence() {
    this.sentenceForm = this.form.initComponentForm(EDIT_SENTENCE_FORM, this.sourceInfo);
    this.newSentenceMode = true;
    this.editSentenceId = null;
  }

  editSentence(sentence) {
    this.sentenceForm = this.form.initComponentForm(EDIT_SENTENCE_FORM, sentence);
    this.newSentenceMode = false;
    this.editSentenceId = sentence.id || null;
  }

  editSentenceMode(sentence) {
    return sentence.id === this.editSentenceId && this.sentenceForm;
  }

  createSentence() {
    this.app.create(this.sentencesApiUrl, this.sentenceForm.value)
      .subscribe(data => {
        this.app.get(this.wordApiUrl, {})
          .subscribe((response) => {
            this.word = response;
            this.wordService.insertWord(this.word);
          })  
        this.viewSentence();
      })
  }

  viewSentence() {
    this.newSentenceMode = false;
    this.editSentenceId = null;
    this.sentenceForm.reset();
  }

  updateSentence(sentence) {
    this.app.update(this.sentencesApiUrl + '/' + sentence.id, this.sentenceForm.value)
      .subscribe(data => {
        this.app.get(this.wordApiUrl, {})
          .subscribe((response) => {
            this.word = response;
            this.wordService.insertWord(this.word);
          })  
        this.viewSentence();
      })
  }
}
