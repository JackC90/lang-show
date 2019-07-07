import { Injectable, Inject } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { Word } from './word';

@Injectable()
export class WordService {
  
  // Observable string source
  private wordDataSource = new Subject<Word>();

  // Observable string stream
  wordData$ = this.wordDataSource.asObservable();

  constructor() { }

  insertWord(data: Word) {
    if (data) this.wordDataSource.next(data);
  }
}
