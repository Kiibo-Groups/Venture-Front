import { Injectable } from "@angular/core";

declare var OpenPay;

@Injectable({
  providedIn: "root",
})
export class OpenPayService {
  constructor() {}

  public InitOpenPay() {
    const id = localStorage.getItem("open_pay_id");
    const api_key = localStorage.getItem("open_pay_api_key");

    if (id && api_key) {
      OpenPay.setId(id);
      OpenPay.setApiKey(api_key);
      OpenPay.setSandboxMode(true);
    }
  }

  public CreateSubscription(
    customer_id: string,
    card: any,
    product_id: number
  ) {
    console.log(customer_id, card, product_id);
    /* TODO:conexión con creación suscripción de open pay */
  }
}
