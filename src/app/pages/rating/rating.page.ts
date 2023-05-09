import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.page.html',
  styleUrls: ['./rating.page.scss'],
})
export class RatingPage implements OnInit {

  rating = 3;
  constructor(private navCtrl: NavController, private route: Router) { }

  ngOnInit() {
  }

  goToBack() {
      this.navCtrl.back();
  }

  changeRating(val) {
      this.rating = val;
  }

  goToComments() {
    this.route.navigate(['/comments']);
  }

}
