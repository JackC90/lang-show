import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Angular2TokenService } from 'angular2-token';
import { APP_CONFIG, AppConfig } from './app.config';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app ready!';

  constructor(private http: Http, private _tokenService: Angular2TokenService, @Inject(APP_CONFIG) private config: AppConfig, private router: Router) {
  	this._tokenService.init({
      apiBase:                    null,
      apiPath:                    AppConfig.apiRoot,

      signInPath:                 'api/v1/auth/sign_in',
      signInRedirect:             window.location.origin + '/',
      signInStoredUrlStorageKey:  null,

      signOutPath:                '/api/v1/auth/sign_out',
      validateTokenPath:          'api/v1/auth/validate_token',
      signOutFailedValidate:      false,

      registerAccountPath:        '',
      deleteAccountPath:          '',
      registerAccountCallback:    window.location.origin + '/users/:id',

      updatePasswordPath:         '',
      resetPasswordPath:          'password/edit',
      resetPasswordCallback:      window.location.href,

      oAuthBase:                  window.location.origin,
      oAuthPaths: {
        github:                 'github'
      },
      oAuthCallbackPath:          'oauth_callback',
      oAuthWindowType:            'newWindow',
      oAuthWindowOptions:         null,

      userTypes:                  null,

      globalOptions: {
        headers: {
          'Content-Type':     'application/json',
          'Accept':           'application/json'
        }
      }
    });
  }

  isPublic(route) {
    let publicRoutes: string[] = ['/', '/sign_up'];
    return publicRoutes.includes(route);
  }
}