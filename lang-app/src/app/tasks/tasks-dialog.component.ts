import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Task } from '../task/task';
import { AppService } from '../app.service';
import { TasksService } from './tasks.service';
import { Article } from '../article/article';


@Component({
  selector: 'tasks-dialog',
  templateUrl: 'tasks-dialog.component.html',
  styleUrls: ['tasks.component.css']
})
export class TasksDialogComponent implements OnInit {
  taskArticlesApiUrl: string;
  tasks: Task[];

  constructor(
    public dialogRef: MatDialogRef<TasksDialogComponent>,
    private route: ActivatedRoute,
    private router: Router,
    private app: AppService,
    private tasksService: TasksService,
    @Inject(MAT_DIALOG_DATA) public article: Article
  ) {
  }

  ngOnInit() {
    this.taskArticlesApiUrl = "task_articles";
        
    this.tasksService.getTasks()
      .subscribe(response => {
        this.tasks = response
      });    
  }

  updateTaskArticle(task) {
    let taskArticle = {
      task_id:    task.id,
      article_id: this.article.id
    };
    this.app.create(this.taskArticlesApiUrl, taskArticle)
      .subscribe(res => {
        this.dialogRef.close();
      })
  }
}
