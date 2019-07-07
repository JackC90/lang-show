import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Angular2TokenService } from 'angular2-token';
import { APP_CONFIG, AppConfig } from '../app.config';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Task } from '../task/task';

@Injectable()
export class TasksService {
  headers: Headers;
  options: RequestOptions;

  private tasksApiUrl;
  private taskArticlesApiUrl;

  constructor(
    private http: Http, 
    @Inject(APP_CONFIG) private config: AppConfig, 
    public _sessionService: Angular2TokenService,
  ) {
    this.tasksApiUrl = `tasks`;
    this.taskArticlesApiUrl = "task_articles";
  }

  getTasks(): Observable<Task[]> {
    return this._sessionService.get(this.tasksApiUrl)
      .map((response: Response) => <Task[]>response.json())
  } 

  createTask(task: Task): Observable<Task> {
    return this._sessionService.post(this.tasksApiUrl, JSON.stringify(task),
      this.options).map((res: Response) => res.json());
  }

  deleteTask(id: number): Observable<Task> {
    const url = `${this.tasksApiUrl}/${id}`;
    return this._sessionService.delete(url, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  updateTask(task: Task): Observable<Task> {
    const url = `${this.tasksApiUrl}/${task.id}`;
    return this._sessionService.put(url, JSON.stringify(task),
      this.options).map((res: Response) => res.json())
          .catch(this.handleError);
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
