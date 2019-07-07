import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import { Article } from './article';

@Injectable()
export class ArticleService {
  
  // Observable string source
  private articleDataSource = new BehaviorSubject(null);

  // Observable string stream
  articleData$ = this.articleDataSource.asObservable();

  constructor() { }

  insertArticle(data: Article) {
    this.articleDataSource.next(data);
  }
}
