import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  screenHeight;
  userList = [
      {
          img : 'assets/imgs/user.jpg',
          name : 'Anthony Dale',
          status: 1
      },
      {
          img : 'assets/imgs/user2.jpg',
          name : 'Jennie Vin',
          status: 0
      },
      {
          img : 'assets/imgs/user3.jpg',
          name : 'Martin Lopez',
          status: 1
      },
      {
          img : 'assets/imgs/user4.jpg',
          name : 'Jonh Doe',
          status: 0
      },
      {
          img : 'assets/imgs/user5.jpg',
          name : 'Malvin Firdaus',
          status: 1
      },
      {
        img : 'assets/imgs/user.jpg',
        name : 'Anthony Dale',
        status: 1
      },
      {
          img : 'assets/imgs/user2.jpg',
          name : 'Jennie Vin',
          status: 0
      },
      {
          img : 'assets/imgs/user3.jpg',
          name : 'Martin Lopez',
          status: 1
      },
      {
          img : 'assets/imgs/user4.jpg',
          name : 'Jonh Doe',
          status: 0
      },
      {
          img : 'assets/imgs/user5.jpg',
          name : 'Malvin Firdaus',
          status: 1
      },
  ];


  constructor(private route: Router, private navCtrl: NavController, private platform: Platform) {
      console.log('==============' + platform.height());
      this.screenHeight = platform.height() - 200;
  }

  ngOnInit() {
  }

  goToBack() {
    this.navCtrl.back();
  }

  goToChatList() {
    this.route.navigate(['/chat-detail']);
  }

}
