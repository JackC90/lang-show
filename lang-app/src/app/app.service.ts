import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams, RequestMethod } from '@angular/http';
import { Angular2TokenService } from 'angular2-token';
import { APP_CONFIG, AppConfig } from './app.config';
import { Observable, Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { ActivatedRoute } from "@angular/router";
import { MatSnackBar } from '@angular/material';

@Injectable()
export class AppService {
  headers: Headers;
  options: RequestOptions;
  
  titleDataSource = new Subject;
  titleData$ = this.titleDataSource.asObservable();

  constructor(
    private http: Http, 
    @Inject(APP_CONFIG) private config: AppConfig, 
    public _sessionService: Angular2TokenService,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar
  ) {
  }

  get(apiUrl: string, data: object) {
    let params: URLSearchParams = new URLSearchParams();    
    Object.keys(data).forEach(function(key) {
      params.set(key, data[key]);
    });
    
    let requestOptions = new RequestOptions();
    requestOptions.search = params;
    requestOptions.url = this.config.apiRoot + "/" + apiUrl;
    requestOptions.method = RequestMethod.Get;

    return this._sessionService.get(apiUrl, requestOptions)
      .map(this.extractData)
      .catch((err) => {
        return this.handleError(err);
      })
  }

  create(apiUrl: string, data: object) {
    return this._sessionService.post(apiUrl, JSON.stringify(data))
      .map(this.extractData)
      .catch((err) => {
        return this.handleError(err);
      })
  }

  delete(apiUrl: string) {
    return this._sessionService.delete(apiUrl)
      .map(this.extractData)
      .catch((err) => {
        return this.handleError(err);
      })
  }

  update(apiUrl: string, data: object) {
    return this._sessionService.put(apiUrl, JSON.stringify(data))
      .map(this.extractData)
      .catch((err) => {
        return this.handleError(err);
      })
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  // =============
  // Error handler
  // =============
  notify(status: any, text: any) {
    this.snackbar.open(status, text, {
      duration: 3000
    });
  }

  public handleError(error: Response) {
    this.notify(error.status, error.statusText);
    return Observable.throw(error || 'Server error');
  }

  // =======
  // Display
  // =======
  /*
  *  Toolbar title
  */
  insertTitle(data: string) {
    this.titleDataSource.next(data);
  }

  /*
  *  Prints human readable data
  */
  print(data: any) {
    return data ? data : "-";
  }

  /*
  *  Prints truncated
  */
  printTruncate(data: any, charNo: number = 100) {
    if (data) {
      if (data.length < charNo) {
        return data;
      } else {
        return data.substring(0, charNo) + "...";
      }
    }
  }

  /*
  *  Print with paragraph spaces 
  *    spaceNo: Number of lines between paragraphs
  */
  printParaSpace(data: any, spaceNo: number = 2) {
    if (data) {
      let lineSpacing = "";
      for (let n = 0; n < spaceNo; n++) {
        lineSpacing += "<br>";
      }
      data = data.replace(/\n/g, lineSpacing);
    }
    return data;
  }

  /*
  *  Print with target word bold 
  */
  parseSentence(sentence: string, word: string) {
    let targetWord = new RegExp(word, 'gi') || null;
    if (sentence && targetWord) {
      return sentence.replace(targetWord, "<u>" + word.bold() + "</u>");
    }
    return sentence;
  }
}
