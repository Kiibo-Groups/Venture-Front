import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-all-services',
  templateUrl: './all-services.page.html',
  styleUrls: ['./all-services.page.scss'],
})
export class AllServicesPage implements OnInit {

  screenHeight;
  services = [
    {
      img: 'assets/imgs/conditioner.png',
      name : 'AC Service'
    },
    {
      img: 'assets/imgs/fan.png',
      name : 'Fan Service'
    },
    {
      img: 'assets/imgs/laptop.png',
      name : 'Laptop Service'
    },
    {
      img: 'assets/imgs/sofa.png',
      name : 'Furniture Service'
    },
    {
      img: 'assets/imgs/washing-machine.png',
      name : 'Washer Service'
    },
    {
      img: 'assets/imgs/car.png',
      name : 'Car Service'
    },
    {
      img: 'assets/imgs/television.png',
      name : 'Television Service'
    }
  ];

  length;

  constructor(private navCtrl: NavController, private platform: Platform, private route: Router) {
      this.length = this.services.length / 2;
      console.log(Math.round(this.length));
      console.log('==============' + platform.height());
      this.screenHeight = platform.height() - 150;
  }

  ngOnInit() {
  }

  goToBack() {
    this.navCtrl.back();
  }

  goToServiceDetail() {
      // this.route.navigate(['service-detail']);
      this.route.navigate(['/order-detail']);
  }

}
