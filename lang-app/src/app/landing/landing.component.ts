import { Component, OnInit } from '@angular/core';
import { trigger,state,style,transition,animate,keyframes } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  animations: [
    trigger('titleAnimation', [
      transition('void => *', [
        style({transform: 'translateY(100%)'}),
        animate('1s')
      ])
    ]),
  ]
})
export class LandingComponent implements OnInit {

  navLinks;

  constructor(private router: Router) { 
    this.navLinks = [
      {
        path: '/',
        label: 'Sign In'
      },
      {
        path: '/sign_up',
        label: 'Register'
      }
    ];
  }

  ngOnInit() {
  }

}
