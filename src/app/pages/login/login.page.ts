import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { ServerService } from '../../service/server.service';
import { EventsService } from '../../service/events.service';
import { ToastController, NavController, Platform, LoadingController, IonInput, MenuController, ModalController, ActionSheetController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
 
  user_id: any = null;
  constructor(
      public server : ServerService,
      public toastController: ToastController,
      private nav: NavController,
      public loadingController: LoadingController,
      public events: EventsService,
      public platform: Platform,
      public menu: MenuController,
      public modalController: ModalController,
      public actionSheetController: ActionSheetController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){ 
      this.menu.enable(false); 
  
      if (localStorage.getItem('user_id') && localStorage.getItem('user_id') != null) {
        this.user_id = localStorage.getItem('user_id');
      }
  }

  async login(data)
  {
    const loading = await this.loadingController.create({
      mode:'md'
    });
    await loading.present();

    this.server.login(data).subscribe((req:any) => {
      loading.dismiss();
      console.log(req);
      if (req.msg != 'error') {
        this.server.presentToast('Bienvenido(a) de nuevo...','success');
        localStorage.setItem('user_id',req.user_id);
        this.events.publish('user_login', req.user_id);
        this.nav.navigateRoot('/tabs/home')
      }else {
        this.server.presentToast("Los datos de acceso son incorrectos, por favor validalos.","danger");
      }
    });
  }

  goToBack()
  {
    this.nav.back();
  }
}
