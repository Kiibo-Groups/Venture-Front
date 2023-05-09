import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.page.html',
  styleUrls: ['./order-history.page.scss'],
})
export class OrderHistoryPage implements OnInit {

  screenHeight;
  userList = [
    {
        img : 'assets/imgs/user.jpg',
        name : 'Anthony Dale',
        status: '10 days'
    },
    {
        img : 'assets/imgs/user2.jpg',
        name : 'Jennie Vin',
        status: '8 days'
    },
    {
        img : 'assets/imgs/user3.jpg',
        name : 'Martin Lopez',
        status: '5 days'
    },
    {
        img : 'assets/imgs/user4.jpg',
        name : 'Jonh Doe',
        status: 'Over'
    },
    {
        img : 'assets/imgs/user5.jpg',
        name : 'Malvin Firdaus',
        status: 'Over'
    },
  ];


  constructor(private route: Router, private navCtrl: NavController, private platform: Platform) {
      console.log('==============' + platform.height());
      this.screenHeight = platform.height() - 150;
  }

  ngOnInit() {
  }

  goToBack() {
    this.navCtrl.back();
  }

  goToRatings() {
      this.route.navigate(['/rating']);
  }

}
