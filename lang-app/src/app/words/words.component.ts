import { Component, ViewChild, OnInit, Input, Inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Language } from '../language/language';
import { Word } from '../word/word';
import { Task } from '../task/task';
import { AppService } from '../app.service';
import { FormService } from '../app.forms';
import { WordService } from '../word/word.service';
import { LanguageService } from '../language/language.service';
import { APP_CONFIG, AppConfig } from '../app.config';

@Component({
  selector: 'app-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.css']
})
export class WordsComponent implements OnInit {
  @ViewChild('hot') hot;

  wordsParams: object = {};
  id: number;
  userId: number;

  language: Language;
  words: Word[];
  currentWord: Word;
  updateWords: Word[];
  
  errors: any;
  returnUrl: string;
  wordsApiUrl: string;
  tableOptions: object = {};

  @Input() task;
  @Input() article;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appService: AppService,
    private form: FormService,
    private languageService: LanguageService,
    private wordService: WordService,
    @Inject(APP_CONFIG) private config: AppConfig,
  ) {
  }

  ngOnInit() {
    this.updateWords = [];
    this.wordsParams = this.getFilterParams();

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || `/main/words/`;
    this.wordsApiUrl = `words`;
    
    this.appService.get(this.wordsApiUrl, this.wordsParams)
      .subscribe(response => {
        this.words = response
      })

    // Get language
    this.languageService.languageData$
      .subscribe(data => {
        this.language = data;
      })

    // Detect word update
    this.wordService.wordData$
      .subscribe(data => {
        if (this.currentWord && (data === this.currentWord)) {
          return;
        }
        this.currentWord = data;

        this.appService.get(this.wordsApiUrl + '/' + data.id, {})
          .subscribe(response => {
            this.words.forEach((word, index) => {
              if (this.currentWord && (word.id === this.currentWord.id)) {
                this.words[index] = this.currentWord;
              }
            })
          })
      }) 

    this.tableOptions = {
      height: 396,
      rowHeaders: true,
      stretchH: 'all',
      columnSorting: true,
      contextMenu: true,
      columns: [
        {data: 'text', type: 'text'},
        {data: 'alt_text', type: 'text'},
        {data: 'pinyin', type: 'text'},
        {data: 'meaning', type: 'text'},
        {data: 'note', type: 'text'}
      ],
      colHeaders: ["Simplified *", "Traditional", "Pinyin", "Meaning", "Notes"],
      colWidths: [100, 100, 100, 420, 100]
    } 
  }

  private isEmptyRow(row) {
    let isEmpty = true;
    row.forEach(cell => {
      if (cell) {
        isEmpty = false;
      }
    });
    return isEmpty;
  }

  public getNewWords(table) {
    let hotInstance = table.getHandsontableInstance();
    return hotInstance.getSourceData().filter((word) => {
      return !word.id && (word.text || word.alt_text);
    });
  }

  public unsavedCount(table) {
    return this.updateWords.length + this.getNewWords(table).length;
  }

  private storeChanges($event) {
    let changes = $event[0];
    let hotInstance = this.hot.getHandsontableInstance();

    if (changes) {
      changes.forEach((item) => {
        if (item[2] !== item[3]) {
          let updateWord = hotInstance.getSourceDataAtRow(item[0]);
          if (updateWord.id) {
            let subset = ["id", item[1]].reduce((obj, key) => { obj[key] = updateWord[key]; return obj; }, {});
            this.updateWords.push(subset);
          }
        } 
      })
    }

    // Append empty row, if last row filled 
    let rowCount = hotInstance.countRows();
    let lastRow;
    if (rowCount > 0) {
      lastRow = hotInstance.getDataAtRow(hotInstance.countRows() - 1);
    }
    if (rowCount < 1 || (lastRow && !this.isEmptyRow(lastRow))) {
      hotInstance.alter('insert_row');
    }
  }

  private saveChanges(table) {
    let hotInstance = table.getHandsontableInstance();
    let updateWordRequests = [];

    // Update words
    this.updateWords.forEach((word) => {
      let req;
      if (word.id) {
        req = this.appService.update(this.wordsApiUrl + '/' + word.id, word);       
      }
      updateWordRequests.push(req);
    });
    
    // Create words
    let newWords = this.getNewWords(table);
    newWords.forEach((word) => {
      let req;
      if (!word.id && (word.text || word.alt_text)) {
        // Link to task / article
        word = this.addFilterParams(word);
        // Assign language
        word.language_id = this.language ? this.language.id : null;
        // Prune null cells
        Object.keys(word).forEach((key) => (word[key] == null) && delete word[key]);
        req = this.appService.create(this.wordsApiUrl, word);
        updateWordRequests.push(req);
      }
    });
    Observable
      .forkJoin(updateWordRequests)
      .subscribe((res) => {
        this.appService.get(this.wordsApiUrl, this.wordsParams)
          .subscribe(response => {
            this.words = response;
            
            // Update current word in sidebar
            this.wordService.wordData$.subscribe(data => {
              this.currentWord = this.words.filter((word) => { 
                word.id === data.id; 
              })[0];
              this.wordService.insertWord(this.currentWord);
            });
          })
        this.updateWords = [];
      });
  }

  private getFilterParams() {
    let params = {};
    let filterComponents = ["task", "article"];
    filterComponents.forEach((component) => {
      if (this[component]) {
        params[component + "_id"] = this[component]["id"];
      }
    });
    return params;
  }

  private addFilterParams(word) {
    let filterParams = this.getFilterParams();
    return Object.assign(word, filterParams);
  }

  private showWord(event) {
    let hotInstance = this.hot.getHandsontableInstance();
    let currentWord = hotInstance.getSourceDataAtRow(event[0]);

    // Break if current selected word is same as previous selected word
    if (!currentWord.id || (this.currentWord && (currentWord.id === this.currentWord.id))) {
      return;
    }
    this.appService.get(this.wordsApiUrl + '/' + currentWord.id, {})
      .subscribe((response) => {
        this.currentWord = response;
        this.wordService.insertWord(this.currentWord);
      })  
  }
}
