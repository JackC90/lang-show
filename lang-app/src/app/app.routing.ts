import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';

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
import { ArticlesComponent } from './articles/articles.component';
import { ArticleComponent } from './article/article.component';
import { SidenavContentComponent } from './sidenav-content/sidenav-content.component';

// Routes
const routes: Routes = [
  { path: '', component: LandingComponent, children:[
    { path : 'sign_up', component: SignUpComponent },
    { path : '', component: SignInComponent }
  ]},
  { path: 'main', component: SidenavContentComponent, canActivate: [ AuthGuard ], children:[
    { path: 'tasks', component: TasksComponent, data: { title: "Tasks" }, canActivate: [ AuthGuard ]},
    { path: 'tasks/:id', component: TaskComponent, data: { title: "Task" }, canActivate: [ AuthGuard ]},
    { path: 'words', component: WordsComponent, data: { title: "Words" }, canActivate: [ AuthGuard ]},
    { path: 'articles', component: ArticlesComponent, data: { title: "Articles" }, canActivate: [ AuthGuard ]},
    { path: 'articles/:id', component: ArticleComponent, data: { title: "Article" }, canActivate: [ AuthGuard ]},
  ]},

  // redirect to home
  { path: '**', redirectTo: '/main/tasks', pathMatch: 'full' }
];

export class AppModule { }
export const routing = RouterModule.forRoot(routes);
