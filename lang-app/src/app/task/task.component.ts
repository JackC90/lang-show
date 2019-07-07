import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Task } from './task';
import { Item } from './item';
import { AppService } from '../app.service';
import { TaskService } from './task.service';
import { FormService, BaseField } from '../app.forms';
import { FormGroup } from '@angular/forms';
import { EDIT_TASK_FORM } from './task.forms';
import { EDIT_ITEM_FORM } from './item.forms';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  id: number;
  task;
  userId: number;
  errors: any;
  returnUrl: string;
  taskApiUrl: string;
  itemsApiUrl: string;
  editBtnClicked: boolean = false;
  isEditTaskMode: boolean = false;
  isEditItemMode: boolean = false;
  editItemId: number = null;
  taskFields: BaseField[];
  editTaskForm: FormGroup;
  itemFields: BaseField[];
  editItemForm: FormGroup;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private app: AppService,
    private taskService: TaskService,
    private form: FormService
  ) {
  }

  // Tasks index
  options = {
    status: ["Active", "Done", "Overdue", "Inactive"]
  };

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.id = +params['id'];
        this.taskApiUrl = "tasks/"+params['id'];
        this.itemsApiUrl = this.taskApiUrl + '/items';
      }
    ) 

    this.route.parent.params.subscribe(
      params => {
        this.userId = +params['id'];
      }
    ) 

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || "/users/"+this.userId+"/tasks/"+this.id;
    this.taskFields = EDIT_TASK_FORM;
    this.itemFields = EDIT_ITEM_FORM;
    this.route.params
      .flatMap((params: Params) => 
        this.taskService.getTask(+params['id']))
      .subscribe(response => {
        this.task = response;
      }) 
  }

  editTaskMode() {
    this.editTaskForm = this.form.initComponentForm(EDIT_TASK_FORM, this.task);
    this.isEditTaskMode = !this.isEditTaskMode;
  }

  updateTask() {
    this.app.update(this.taskApiUrl, this.editTaskForm.value)
      .subscribe((res) => {
        this.task = res;
        this.editTaskMode();
      })
  }

  editItemMode(item, modeOn: boolean) {
    this.isEditItemMode = modeOn;
    if (this.editItemMode) {
      this.editItemForm = this.form.initComponentForm(EDIT_ITEM_FORM, item);
      this.editItemId = item && item.id ? item.id : null;
    }
  }

  createItem() {
    this.app.create(this.itemsApiUrl, this.editItemForm.value)
      .subscribe((res) => {
        this.app.get(this.taskApiUrl, {})
          .subscribe((res) => {
            this.task = res;
            this.editItemMode(null, false);
          })
      })
  }

  updateItem(item) {
    this.app.update(this.itemsApiUrl + "/" + item.id, this.editItemForm.value)
      .subscribe((res) => {
        this.app.get(this.taskApiUrl, {})
          .subscribe((res) => {
            this.task = res;
            this.editItemMode(null, false);
          })
      })
  }

  updateDone(item) {
    this.app.update(this.itemsApiUrl + "/" + item.id, {is_done: item.is_done})
      .subscribe((res) => {
      })
  }

  delete(task: Task) {
    this.taskService.deleteTask(this.task.id)
      .subscribe(data => { 
        this.router.navigate([this.returnUrl]);
      }, 
        error => this.errors = error);
  }

  onUpdateClicked() {
    this.router.navigate([this.returnUrl]);
    this.editBtnClicked = false;
  }

  showItemForm(item) {
    let isItemMatch = (this.editItemId == null && item == null) ||
      (item && (this.editItemId === item.id));
    return isItemMatch && 
      this.isEditItemMode && 
      this.editItemForm;
  }

  private _handleSuccess(data: any) {
    this.errors = null;
    this.route.params
      .flatMap((params: Params) => 
        this.taskService.getTask(this.id))
      .subscribe(response => {
        this.router.navigate([this.returnUrl]);
        this.task = response;
        window.location.reload();
      });
  }

  private _handleError(error: any) {
    this.errors = error.json().errors.full_messages;
  }

  hasLinkedArticles() {
    return this.task && this.task.articles && this.task.articles.length > 0;
  }
}
