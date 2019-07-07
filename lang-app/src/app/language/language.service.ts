import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AppService } from '../app.service';
import 'rxjs/add/operator/map';
import { Language } from './language';

@Injectable()
export class LanguageService {

  constructor(
  ) {}
 
  // Observable string source
  private languageDataSource = new BehaviorSubject(null);

  // Observable string stream
  languageData$ = this.languageDataSource.asObservable();

  insertLanguage(data: Language) {
    if (data) this.languageDataSource.next(data);
  }

}
