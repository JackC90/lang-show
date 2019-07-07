import { Component, OnInit } from '@angular/core';
import { CustomMaterialModule } from '../custom-material/custom-material.module';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TasksDialogComponent } from '../tasks/tasks-dialog.component';
import { AppService } from '../app.service';
import { FormService, BaseField } from '../app.forms';
import { ArticleService } from './article.service';
import { FormGroup } from '@angular/forms';
import { EDIT_ARTICLE_FORM } from '../article/article.forms';
import { Article } from './article';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  article: Article;
  articleApiUrl: string;
  editArticleMode: boolean;
  articleFields: BaseField[];
  editArticleForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private app: AppService,
    private form: FormService,
    private articleService: ArticleService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.articleApiUrl = "articles/"+params['id'];
      }
    )

    this.app.get(this.articleApiUrl, {})
      .subscribe(response => {
        this.article = response;
        this.articleService.insertArticle(this.article);
      }) 
    this.articleFields = EDIT_ARTICLE_FORM;
  }

  editArticle() {
    if (this.editArticleMode) {
      this.editArticleMode = false;
    } else {
      this.editArticleForm = this.form.initComponentForm(EDIT_ARTICLE_FORM, this.article);
      this.editArticleMode = true;
    }  
  }

  updateArticle() {
    this.app.update(this.articleApiUrl, this.editArticleForm.value)
      .subscribe(data => {
        this.app.get(this.articleApiUrl, {})
          .subscribe((response) => {
            this.article = response;
            this.articleService.insertArticle(this.article);
          })  
        this.editArticleMode = false;
      })
  }

  openTasksDialog(): void {
    let dialogRef = this.dialog.open(TasksDialogComponent, {
      width: '640px',
      data: this.article
    });

    dialogRef.afterClosed().subscribe((res) => {
    });
  }
}
