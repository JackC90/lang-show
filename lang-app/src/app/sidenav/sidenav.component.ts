import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomMaterialModule } from '../custom-material/custom-material.module';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router, RouterModule, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';
import { AppService } from '../app.service';
import { WordService } from '../word/word.service';
import { LanguageService } from '../language/language.service';
import { LanguageComponent } from '../language/language.component';
import { Language } from '../language/language';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @ViewChild('hot') hot;

  navLinks;
  currentUser: Object;
  sidenavState: boolean;
  permittedLinks: string[];
  openSidenavLeft: boolean;
  openSidenavRight: boolean;
  hasContent: boolean;
  title: string = "Home";
  languages: Language[];
  setLanguage: Language;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public _sessionService: Angular2TokenService,
    private app: AppService,
    private wordService: WordService,
    private languageService: LanguageService,
    public dialog: MatDialog
  ) {
    this.permittedLinks = ['tasks', 'words', 'articles'];
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.navLinks = router.config.filter(
      route => route.path == 'main'
    )[0].children.filter(
      childRoute => this.permittedLinks.includes(childRoute.path)
    );
  }

  ngOnInit() {
    this.openSidenavLeft = false;
    this.openSidenavRight = false;

    // Set Page Title on Load
    this.setTitle(this.route.data);
    // Set Page Title on Route Change
    this.setTitle(this.router.events.filter((event) => event instanceof NavigationEnd));

    this.app.get("languages", {})
      .subscribe((res) => {
        this.languages = res;

        this.languageService.languageData$
          .subscribe((data) => {
            if (data) {
              this.setLanguage = data;
            } else {
              this.setLanguage = this.languages[0];
              this.languageService.insertLanguage(this.setLanguage);
            }
          });
      })

    this.wordService.wordData$.subscribe(data => {
      if (data) {
        this.hasContent = true;
        this.openSidenavRight = true;
      } else {
        this.hasContent = false;
        this.openSidenavRight = false;
      }
    });
  }

  setTitle(routeData) {
    routeData
      .map(() => this.route)
      .map((route) => {
        while (route.firstChild) route = route.firstChild;
        return route;
      })
      .filter((route) => route.outlet === 'primary')
      .mergeMap((route) => route.data)
      .subscribe((event) => {
        if (event['title']) this.title = event['title'];
      });
  }

  signOut(): void {
    this._sessionService.signOut();
    localStorage.removeItem("currentUser");
    this.router.navigate(['/']);
  }

  openLanguageDialog(): void {
    let dialogRef = this.dialog.open(LanguageComponent, {
      width: '400px',
      data: this.languages
    });

    dialogRef.afterClosed().subscribe((res) => {
    });
  }
}
