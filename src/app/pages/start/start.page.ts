import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }

  goToLogin() {
    this.route.navigate(['\login']);
  }

}
