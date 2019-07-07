import { Component, OnInit } from '@angular/core';
import { CustomMaterialModule } from '../../custom-material/custom-material.module';
import { Router } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';
import { AuthService } from '../auth.service';
import { SIGN_UP_FORM } from '../auth.forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  _errors: string[];
  formGroup: any;

  constructor(
    public _formService: AuthService,
    public _sessionService: Angular2TokenService,
    public _router: Router
  ) {  
    this._formService.initForm(SIGN_UP_FORM);

    this._formService.submit$.subscribe(
      (data) => { 
        this._sessionService.registerAccount(data).subscribe(
          res =>      this._handleSuccess(res),
          error =>    this._handleError(error)
        )
      }
    );
  }

  ngOnInit() {
  }

  private _handleSuccess(data: any) {
    this._errors = null;
    this._formService.unlockSubmit();
    this._router.navigate(['restricted']);
  }

  private _handleError(error: any) {
    this._errors = error.json().errors.full_messages;
    this._formService.unlockSubmit();
  }
}
