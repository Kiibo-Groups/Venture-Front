import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-chat-detail',
  templateUrl: './chat-detail.page.html',
  styleUrls: ['./chat-detail.page.scss'],
})
export class ChatDetailPage implements OnInit {

  screenHeight;
  tabID = 1;
  messages = [
    {
      side : 'left',
      msg : 'Hello'
    },
    {
      side : 'right',
      msg : 'Hii'
    },
    {
      side : 'left',
      msg : 'Are you nearby ?'
    },
    {
      side : 'right',
      msg : 'I will be there in few mins'
    },
    {
      side : 'left',
      msg : 'Ok, I am waiting at vinmark Store'
    },
    {
      side : 'right',
      msg : 'Sorry I am stuck in traffic. Please give me a moment.'
    },
    {
      side : 'left',
      msg : 'Hello'
    },
    {
      side : 'right',
      msg : 'Hii'
    },
    {
      side : 'left',
      msg : 'Are you nearby ?'
    },
    {
      side : 'right',
      msg : 'I will be there in few mins'
    },
    {
      side : 'left',
      msg : 'Ok, I am waiting at vinmark Store'
    },
    {
      side : 'right',
      msg : 'Sorry I am stuck in traffic. Please give me a moment.'
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

  changeTab(val) {
    this.tabID = val;
  }

}
