import { APP_CONFIG, AppConfig } from './app.config';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { routing } from './app.routing';
import { HotTableModule } from 'ng2-handsontable';

import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from "@angular/flex-layout";
import { Parallax, ParallaxConfig } from 'ngx-parallax';
import { AuthGuard } from './auth/auth.guard';

// Services
import { Angular2TokenService } from 'angular2-token';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { ArticleService } from './article/article.service';
import { FormService } from './app.forms';
import { TasksService } from './tasks/tasks.service';
import { TaskService } from './task/task.service';
import { WordService } from './word/word.service';
import { LanguageService } from './language/language.service';

// Components
import { AppComponent } from './app.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { WordsComponent } from './words/words.component';
import { WordComponent } from './word/word.component';
import { CustomMaterialModule } from './custom-material/custom-material.module';
import { LandingComponent } from './landing/landing.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { UpdatePasswordComponent } from './auth/update-password/update-password.component';
import { HomeComponent } from './home/home.component';
import { TaskComponent } from './task/task.component';
import { TasksComponent } from './tasks/tasks.component';
import { TasksDialogComponent } from './tasks/tasks-dialog.component';
import { SentencesComponent } from './sentences/sentences.component';
import { ArticlesComponent } from './articles/articles.component';
import { ArticleComponent } from './article/article.component';
import { LanguageComponent } from './language/language.component';
import { SidenavContentComponent } from './sidenav-content/sidenav-content.component';

@NgModule({
  declarations: [
    AppComponent,
    WordsComponent,
    WordComponent,
    SignInComponent,
    SignUpComponent,
    Parallax,
    ResetPasswordComponent,
    UpdatePasswordComponent,
    LandingComponent,
    HomeComponent,
    SidenavComponent,
    TaskComponent,
    TasksComponent,
    TasksDialogComponent,
    SentencesComponent,
    ArticlesComponent,
    ArticleComponent,
    LanguageComponent,
    SidenavContentComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    routing,
    HttpModule,
    HttpClientModule,
    CustomMaterialModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    HotTableModule
  ],
  providers: [
    { provide: APP_CONFIG, useValue: AppConfig },
    Angular2TokenService,
    AppService,
    ArticleService,
    AuthService,
    AuthGuard,
    FormService,
    TasksService,
    TaskService,
    WordService,
    LanguageService
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    LanguageComponent,
    TasksDialogComponent
  ]
})
export class AppModule { }
