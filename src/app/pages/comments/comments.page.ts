import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.page.html',
  styleUrls: ['./comments.page.scss'],
})
export class CommentsPage implements OnInit {

  screenHeight;
  constructor(private route: Router, private navCtrl: NavController, private platform: Platform) {
      console.log('==============' + platform.height());
      this.screenHeight = platform.height() - 200;
  }

  ngOnInit() {
  }

  goToBack() {
      this.navCtrl.back();
  }

  goToBookmark() {
      this.route.navigate(['tabs/bookmark']);
  }

}
