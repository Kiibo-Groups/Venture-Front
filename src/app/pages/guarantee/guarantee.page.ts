import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-guarantee',
  templateUrl: './guarantee.page.html',
  styleUrls: ['./guarantee.page.scss'],
})
export class GuaranteePage implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }

  goToBack() {
    this.route.navigate(['/guarantee']);
  }

}
