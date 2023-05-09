import { NavController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.page.html',
  styleUrls: ['./add-card.page.scss'],
})
export class AddCardPage implements OnInit {

  screenHeight;
  payID = 1;


  constructor(private route: Router , private navCtrl: NavController, private platform: Platform) {
      console.log('==============' + platform.height());
      this.screenHeight = platform.height() - 150;
  }

  ngOnInit() {
  }

  goToBack() {
    this.navCtrl.back();
  }

  goToPayment() {
    this.route.navigate(['/payment']);
  }

}
