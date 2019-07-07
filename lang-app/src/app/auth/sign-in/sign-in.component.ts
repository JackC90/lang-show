import { Component, OnInit } from '@angular/core';
import { CustomMaterialModule } from '../../custom-material/custom-material.module';
import { Router } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';
import { AuthService } from '../auth.service';
import { SIGN_IN_FORM } from '../auth.forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  _errors: string[];
  formGroup: any;

  constructor(
    public _formService: AuthService,
    public _sessionService: Angular2TokenService,
    public _router: Router
  ) { 
    this._formService.initForm(SIGN_IN_FORM);

    this._formService.submit$
      .subscribe((data) => {
        this._sessionService.signIn(data)
          .subscribe(
            res =>      this._handleSuccess(res),
            error =>    this._handleError(error)
          )}
    );
  }

  ngOnInit() {
  }

  private _handleSuccess(data: any) {
    this._errors = null;
    this._formService.unlockSubmit();

    if (data) {
      // store user data, client and token in local storage to keep user logged in
      let currentUser     = data.json().data;
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      this._router.navigate([`/users/${ currentUser.id }`]);
    }
  }

  private _handleError(error: any) {
    this._errors = error.json().errors.full_messages;
    this._formService.unlockSubmit();
  }
}
