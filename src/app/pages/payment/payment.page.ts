import { NavController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

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

  goToHome() {
    this.route.navigate(['/tabs/home']);
  }

  goToAddCard() {
      this.route.navigate(['/add-card']);
  }
}
