import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.page.html',
  styleUrls: ['./order-detail.page.scss'],
})
export class OrderDetailPage implements OnInit {

  qty = 1;
  userList = [
    {
        img : 'assets/imgs/music-player.png',
        name : 'Reinstall OS',
    },
    {
        img : 'assets/imgs/keyboard.png',
        name : 'Keyboard Service',
    },
    {
        img : 'assets/imgs/harddisk.png',
        name : 'Harddidk Service',
    },
    {
        img : 'assets/imgs/wifi.png',
        name : 'Wifi Error',
    }
  ];


  constructor(private route: Router, private navCtrl: NavController) { }

  ngOnInit() {
  }

  goToBack() {
    this.navCtrl.back();
  }

  goToOrderProcess() {
      this.route.navigate(['/order-process']);
  }

  goToServiceDetail() {
    this.route.navigate(['/service-detail']);
  }

  plus () {
      this.qty = this.qty + 1;
  }

  minus() {
      if(this.qty > 1) {
          this.qty = this.qty - 1;
      }
  }

}
