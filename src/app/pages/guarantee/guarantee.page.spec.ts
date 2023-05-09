import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GuaranteePage } from './guarantee.page';

describe('GuaranteePage', () => {
  let component: GuaranteePage;
  let fixture: ComponentFixture<GuaranteePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuaranteePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GuaranteePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
