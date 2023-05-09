import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../service/server.service';
import { EventsService } from '../../service/events.service';
import { NavController, 
  LoadingController,
  MenuController, 
  ToastController,
  IonContent, 
  IonToolbar, 
  DomController,
  ActionSheetController, 
  ModalController} from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  actSlider = 1;
  slideOpts = {
    slidesPerView : 1.4
  };

  serviceOpts = {
    slidesPerView : 2.3
  };

  slideOptsMid = {
    slidesPerView : 1,
    centeredSlides: true,
    spaceBetween: 20,
    
  }

  serviceSlider = [
      {
          img : 'assets/imgs/user.jpg',
          name : 'Anthony Dale'
      },
      {
          img : 'assets/imgs/user2.jpg',
          name : 'Jennie Vin'
      },
      {
          img : 'assets/imgs/user3.jpg',
          name : 'Martin Lopez'
      },
      {
          img : 'assets/imgs/user4.jpg',
          name : 'Jonh Doe'
      },
      {
          img : 'assets/imgs/user5.jpg',
          name : 'Malvin Firdaus'
      },
  ];

  data:any;
  banners_top:any = [];
  banners_mid:any = [];
  events:any = []; 
  user:any;
  showLoading = false;

  constructor(
    private route: Router,
    public server : ServerService,
    public _events: EventsService,
    public nav: NavController, 
    public loadingController: LoadingController,
    public actionSheetController: ActionSheetController,
  ) { 

    
    this.verifyUser();

  }

  ngOnInit() {
  }

  verifyUser()
  {
    this.server.userInfo(localStorage.getItem('user_id')).subscribe((response:any) => { 
      if (response.data) {
        this.user = response.data;
        console.log(this.user);
        // Verificamos si el telefono es null
        if (response.data.phone == 'null') {
          this.server.presentToast("Por favor, inicia tu sesión","danger");
          this.nav.navigateBack('/login');
        // Verificamos si esta bloqueado
        }else if (response.data.status == 1) {
          this.nav.navigateBack('/locked');
        }

        // Si no ha cambiado la pass de Facebook
        if (response.data.password == response.data.pswfacebook) {
          if (!localStorage.getItem('_cookie_notify_facebook_account') && localStorage.getItem('_cookie_notify_facebook_account') == 'null') {
            this.server.presentToast("Te recomendamos cambiar tu contraseña","danger");
            localStorage.setItem("_cookie_notify_facebook_account", "true"); 
          }
        }

      }else {
        this.server.RemoveDatUser();
        this.nav.navigateBack('/welcome');
      }

      this._events.publish('user', response.data);
      this.loadData(localStorage.getItem('city_id')+"?ss=ss");
    });
  }

  async loadData(city_id)
  { 
    this.data = null;
    //this.ViewComerceFilters = false;
     
    var lat = localStorage.getItem("current_lat") ? localStorage.getItem("current_lat") : 0;
    var lng = localStorage.getItem("current_lng") ? localStorage.getItem("current_lng") : 0;

    this.server.homepage_init(city_id+"?lat="+lat+"&lng="+lng+"&user_id="+localStorage.getItem('user_id')).subscribe((response:any) => {
      
      this.data = response.data;
      this.banners_top = response.data.banners_top;
      this.banners_mid = response.data.banners_mid;
      this.events = response.data.events;
      this.showLoading = true;
    });
  }

  viewUrl(link)
  {
    if (link != 'null') {
    window.location = link;}
  }

  viewEvent(link) {
    if (link != 'null') {
      window.location = link;}
  }

  goToAllServices() {
      this.route.navigate(['/tabs/bookmark']);
  }

  goToOrderDetail() {
      this.route.navigate(['/order-detail']);
  }

}
