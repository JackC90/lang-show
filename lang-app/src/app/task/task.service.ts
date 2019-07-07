import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Angular2TokenService } from 'angular2-token';
import { APP_CONFIG, AppConfig } from '../app.config';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import { Task } from './task';
import { Item } from './item';
import { ActivatedRoute } from "@angular/router";

@Injectable()
export class TaskService {
  headers: Headers;
  options: RequestOptions;

  private taskUrl;
  private itemUrl;
  params;

  // Observable string source
  private taskDataSource = new BehaviorSubject(null);

  // Observable string stream
  taskData$ = this.taskDataSource.asObservable();

  constructor(
    private http: Http, 
    @Inject(APP_CONFIG) private config: AppConfig, 
    public _sessionService: Angular2TokenService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe( params => this.params = params)
    this.taskUrl = `tasks`;
    this.itemUrl = `tasks/%{this.params}/items`;
  }

  insertTask(data: Task) {
    this.taskDataSource.next(data);
  }

  getTask(id): Observable<Task>  {
    return this._sessionService.get(this.taskUrl + "/" + id)
      .map((res: Response) => <Task>res.json())
  }

  deleteTask(id: number): Observable<Task> {
    const url = `${this.taskUrl}/${id}`;
    return this._sessionService.delete(url, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  updateTask(task: Task, taskId: number): Observable<Task> {
    const url = `${this.taskUrl}/${taskId}`;
    return this._sessionService.put(url, JSON.stringify(task),
      this.options).map((res: Response) => res.json())
          .catch(this.handleError);
  }

  createItem(item: Item, taskId: number): Observable<Item> {
    return this._sessionService.post(this.itemUrl, JSON.stringify(item),
      this.options).map((res: Response) => res.json());
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occured ', error); 
    return Promise.reject(error.message || error);
  }
  
}
