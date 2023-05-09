import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from '../../service/events.service';
import { ServerService } from '../../service/server.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

    constructor(
      public server: ServerService,
      public events: EventsService,
      private route: ActivatedRoute,
      public nav: NavController
    ) { }

    ngOnInit() {}

    ionViewWillEnter(){ 
  
      this.route.queryParams.subscribe( params => {
          // Obtenemos primera información
          this.server.getDataInit().subscribe((response:any) => { 
          
            this.events.publish('admin', response.data.admin);
            localStorage.setItem('admin', JSON.stringify(response.data.admin));
  
            /**
             * Podemos validar Login
             */
            this.server.chkLog().then((req) => {
              console.log(req);
              if(req){
                if (params.redirect) {
                  this.RedirectPage(params.redirect);
                }else {
                  this.nav.navigateRoot('/tabs/home');
                }
              }else {
                this.nav.navigateRoot('/start');
              }
            });
          });
      });
    }
  
  
    RedirectPage(page)
    {
      setTimeout(() => {
        this.nav.navigateRoot(page);
      }, 1500);
    }

}
