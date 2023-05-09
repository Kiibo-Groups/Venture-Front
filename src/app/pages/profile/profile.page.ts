import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  
  name = 'Smitty Warber';
  email = 'smitty@gmail.com';
  phone = '9876543212';
  address = 'Bhavnagar, Gujrat - 364001';

  changeName = false;
  changeEmail = false;
  changePhone = false;
  changeAddress = false;


  constructor(private route: Router, private navCtrl: NavController) { }

  ngOnInit() {
  }

  goToBack() {
    this.navCtrl.back();
  }

  editName() {
      this.changeName = !this.changeName;
      console.log(this.changeName);
  }

}
