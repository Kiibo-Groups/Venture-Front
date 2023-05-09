import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ServerService } from '../../service/server.service';
import { EventsService } from '../../service/events.service';
import { LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

    constructor(
        private route: Router,
        private navCtrl: NavController,
        public server : ServerService,
        public events: EventsService,
        public nav: NavController,
        public loadingController: LoadingController,
        private _ModalController: ModalController
    ) { }

    ngOnInit() {
    }

    ionViewWillEnter(){
         
    }
     
    async signup(data)
    {
      const loading = await this.loadingController.create({
        mode: 'md'
      });
      await loading.present();
  
      this.server.signup(data).subscribe((response:any) => {
        console.log(response);
        if(response.msg != "done")
        {
          this.server.presentToast(response.msg,'danger');
        }
        else
        {
            localStorage.setItem('user_id',response.user_id);
            this.events.publish('user_login', response.user_id);
            this.server.presentToast("Cuenta Creada con exito, Bienvenido(a)", 'success');
            this.nav.navigateRoot('/welcome');
        }   
  
        loading.dismiss();
      });
    }

    goToBack() {
        this.navCtrl.back();
    }
 
}
