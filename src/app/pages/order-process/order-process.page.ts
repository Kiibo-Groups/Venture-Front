import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-order-process',
  templateUrl: './order-process.page.html',
  styleUrls: ['./order-process.page.scss'],
})
export class OrderProcessPage implements OnInit {

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

  goToPayment() {
      this.route.navigate(['/payment']);
  }

  goToTrackOrder() {
      this.route.navigate(['/tracking-detail']);
  }

}
