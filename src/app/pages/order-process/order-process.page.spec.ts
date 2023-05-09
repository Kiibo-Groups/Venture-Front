import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrderProcessPage } from './order-process.page';

describe('OrderProcessPage', () => {
  let component: OrderProcessPage;
  let fixture: ComponentFixture<OrderProcessPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderProcessPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderProcessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
