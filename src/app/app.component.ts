import { Component,Renderer2,Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NavController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { EventsService } from './service/events.service';
import { ServerService } from './service/server.service';

import OneSignal from 'onesignal-cordova-plugin';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  admin:any;
  user:any;

  constructor(
    public server : ServerService,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public events: EventsService,
    private nav: NavController,
    public renderer: Renderer2,
    @Inject(DOCUMENT) private _document
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleLightContent();
      this.splashScreen.hide();
      this.loadData();

      // Data del admin
      this.events.subscribe('admin', (type) => {  
        this.admin = type;
      });
  
      if(localStorage.getItem('admin'))
      {
        this.admin = JSON.parse(localStorage.getItem('admin'));
      }

      // Data del user
      this.events.subscribe('user_login', (id) => {
        this.subPush(id);
      });
  
      this.events.subscribe('user', (data) => {
        this.user = data;
      });
    });
  }

  subPush(id = 0): void 
  {
    // Uncomment to set OneSignal device logging to VERBOSE  
    // OneSignal.setLogLevel(6, 0);
  
    // NOTE: Update the setAppId value below with your OneSignal AppId.
    OneSignal.setAppId("d14fbbd6-7852-4bc4-8e0b-98747e24ee3f");
    OneSignal.setNotificationOpenedHandler(function(jsonData) {
        console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
    });
  
    // Prompts the user for notification permissions.
    //    * Since this shows a generic native prompt, we recommend instead using an In-App Message to prompt for notification permission (See step 7) to better communicate to your users what notifications they will get.
    OneSignal.promptForPushNotificationsWithUserResponse(function(accepted) {
        console.log("User accepted notifications: " + accepted);
    });

    if(localStorage.getItem('user_id') && localStorage.getItem('user_id') != 'null')
    {
      OneSignal.setExternalUserId(localStorage.getItem('user_id'));
      OneSignal.sendTags({user_id: localStorage.getItem('user_id')});
    }

    if(id > 0)
    {
      OneSignal.setExternalUserId(JSON.stringify(id));
      OneSignal.sendTags({user_id: id})
    }
  } 

  logout()
  {
    localStorage.setItem('user_id',null);
    localStorage.removeItem('user_id');
    this.nav.navigateForward('/welcome');
  }
    
  async loadData()
  {
    this.server.getDataInit().subscribe((response:any) => {
      this.events.publish('admin', response.data.admin); 
      localStorage.setItem('admin', JSON.stringify(response.data.admin));
      // Registramos en oneSignal
      this.subPush();

    });
  }

  private injectSDK(src, id_script): Promise<any> {

    return new Promise((resolve, reject) => {

        window['mapInit'] = () => {
            resolve(true);
        }

        let script = this.renderer.createElement('script');
        script.id = id_script;
        script.attr = 'async';
        script.src = src;

        this.renderer.appendChild(this._document.body, script);

    });
  }
}
