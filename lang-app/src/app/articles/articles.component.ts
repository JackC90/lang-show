import { Component, OnInit } from '@angular/core';
import { CustomMaterialModule } from '../custom-material/custom-material.module';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AppService } from '../app.service';
import { FormService, BaseField } from '../app.forms';
import { FormGroup } from '@angular/forms';
import { EDIT_ARTICLE_FORM, EXTRACT_ARTICLE_FORM } from '../article/article.forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  articles;
  articlesApiUrl: string;
  articleFields: BaseField[];
  extractFields: BaseField[];
  newArticleForm: FormGroup;
  extractForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private app: AppService,
    private form: FormService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.articlesApiUrl = 'articles';
    this.app.get(this.articlesApiUrl, {})
      .subscribe(response => {
        this.articles = response;
      }) 
    this.articleFields = EDIT_ARTICLE_FORM;
    this.extractFields = EXTRACT_ARTICLE_FORM;
    this.newArticleForm = this.form.initComponentForm(EDIT_ARTICLE_FORM, {});
    this.extractForm = this.form.initComponentForm(EXTRACT_ARTICLE_FORM, {});
  }

  public extract() {
    this.app.get("articles/extract", this.extractForm.value)
      .subscribe((res) => {
        this.newArticleForm.patchValue(res);
        this.extractForm.reset();
        this.notify("200", "Article extracted. Click on the New Article panel to save.");
      })
  }

  public createArticle() {
    this.app.create(this.articlesApiUrl, this.newArticleForm.value)
      .subscribe((res) => {
        this.app.get(this.articlesApiUrl, {})
          .subscribe((res) => {
            this.articles = res;
            this.notify("200", "Article created.");
          })
        this.newArticleForm.reset();
      })
  }

  public notify(status: any, text: string) {
    this.snackbar.open(status, text, {
      duration: 3000
    });
  }
}
