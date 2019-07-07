import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AppService } from '../app.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private app: AppService
  ) { }

  canActivate() {
    if (localStorage.getItem('currentUser')) {
      return true;
    } else {
      this.router.navigate(['/main/tasks']);
      return false;
    }
  }
}