import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Http, Headers } from '@angular/http';
import { Task } from '../task/task';
import { AppService } from '../app.service';
import { TasksService } from './tasks.service';
import { FormService, BaseField } from '../app.forms';
import { FormGroup } from '@angular/forms';
import { NEW_TASK_FORM } from './tasks.forms';

@Component({
  selector: 'tasks',
  templateUrl: 'tasks.component.html',
  styleUrls: ['tasks.component.css']
})
export class TasksComponent implements OnInit {
  id: number;
  routeId: any;
  errors: any;
  returnUrl: string;
  editBtnClicked: boolean = false;
  tasksApiUrl: string;
  taskField: BaseField[];
  newTaskForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private app: AppService,
    private tasksService: TasksService,
    private form: FormService
  ) {
  }

  @Input() task;

  // Tasks index
  tasks;

  options = {
    status: ["Active", "Done", "Overdue", "Inactive"],
    languages: []
  };

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/tasks';
    this.tasksApiUrl = "tasks";
    this.taskField = NEW_TASK_FORM;
    this.newTaskForm = this.form.initComponentForm(NEW_TASK_FORM, null);

    this.route.params
      .flatMap((params: Params) => 
        this.tasksService.getTasks())
      .subscribe(response => {
        this.tasks = response
      });    
  }

  createTask() {
    this.app.create(this.tasksApiUrl, this.newTaskForm.value)
      .subscribe((res) => {
        this.app.get(this.tasksApiUrl, {})
          .subscribe((res) => {
            this.tasks = res;
          })
        this.newTaskForm = this.form.initComponentForm(NEW_TASK_FORM, null)
      })
  }

  delete(task: Task) {
    this.tasksService.deleteTask(this.task.id)
      .subscribe(data => { 
        this.router.navigate([this.returnUrl]);
      }, 
        error => this.errors = error);
  }

  onUpdateClicked() {
    this.router.navigate([this.returnUrl]);
    this.editBtnClicked = false;
  }
}
