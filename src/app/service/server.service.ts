import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"; 
import { map } from "rxjs/operators";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { ToastController } from '@ionic/angular';
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { AngularFirestore } from "@angular/fire/firestore";
 

@Injectable({
  providedIn: "root",
})
export class ServerService {
  // url = "https://absolutgo.kiibo.mx/api/"; // PROD
  url = "https://localhost/venture-cafe/api/"; // LOCAL

  geoLatitude = null;
  geoLongitude = null;

  orderList: AngularFireList<any>;

  constructor(
    private http: HttpClient,
    private geolocation: Geolocation,
    private db: AngularFireDatabase,
    private fs: AngularFirestore,
    private toastController: ToastController
  ) {
    this.orderList = this.db.list("/orders");
  }

  get windowRef() {
    return window;
  }

  async presentToast(txt,color) {
    const toast = await this.toastController.create({
      message: txt,
      duration: 3000,
      position : 'top',
      mode:'ios',
      color:color
    });
    toast.present();
  }

  /**
   * Funciones de carga inicial con Data Inicial
   */
  welcome() {
    return this.http.get(this.url + "welcome").pipe(map((results) => results));
  }

  getDataInit() {
    console.log(this.url + "getDataInit?lid=0");
    return this.http
      .get(this.url + "getDataInit?lid=0")
      .pipe(map((results) => results));
  }

  homepage2(city_id, lid) {
    return this.http
      .get(this.url + "homepage/" + city_id + "/" + lid)
      .pipe(map((results) => results));
  }

  homepage(city_id) {
    console.log(this.url + "homepage/" + city_id);
    return this.http
      .get(this.url + "homepage/" + city_id)
      .pipe(map((results) => results));
  }

  homepage_init(city_id) {
    console.log(this.url + "homepage_init/" + city_id);
    return this.http
      .get(this.url + "homepage_init/" + city_id)
      .pipe(map((results) => results));
  }

  /**
   * Obtencion de ubicaciones y Geolocalizacion
   */
  getGeolocation() {
    this.geolocation
      .getCurrentPosition()
      .then((resp) => {
        this.geoLatitude = resp.coords.latitude;
        this.geoLongitude = resp.coords.longitude;
        //this.geoAccuracy = resp.coords.accuracy;

        localStorage.setItem("current_lat", this.geoLatitude);
        localStorage.setItem("current_lng", this.geoLongitude);
      })
      .catch((error) => {
        //  Fail
        console.log(error);
      });
  }

  GeocodeFromCoords(lat, lng, apikey) {
    return this.http
      .get(
        "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
          lat +
          "," +
          lng +
          "&key=" +
          apikey
      )
      .pipe(map((results) => results));
  }

  GeocodeFromAddress(address, apikey) {
    return this.http
      .get(
        "https://maps.googleapis.com/maps/api/geocode/json?address=" +
          address +
          "&key=" +
          apikey
      )
      .pipe(map((results) => results));
  }

  /**
   * Funciones para obtener informacion del usuario y su perfil
   * @param id
   * @returns
   */
  userInfo(id) {
    return this.http
      .get(this.url + "userinfo/" + id)
      .pipe(map((results) => results));
  }

  updateInfo(data, id) {
    return this.http
      .post(this.url + "updateInfo/" + id, data)
      .pipe(map((results) => results));
  }

  RemoveDatUser() {
    localStorage.removeItem("user_id");
    localStorage.removeItem("current_lat");
    localStorage.removeItem("current_lng");
    localStorage.removeItem("odata");
    localStorage.removeItem("city_id");
    localStorage.removeItem("city_name");
  }

  /**
   * Funciones de inicioa de sesion
   * Usuario|Password , Facebook , GooglePlus
   * @param data
   * @returns
   */
  login(data) {
    return this.http
      .post(this.url + "login", data)
      .pipe(map((results) => results));
  }

  loginFb(data) {
    return this.http
      .post(this.url + "loginFb", data)
      .pipe(map((results) => results));
  }

  logingl(data) {
    return this.http
      .post(this.url + "loginGl", data)
      .pipe(map((results) => results));
  }

  /**
   * Funciones para el registro de usuarios
   * @param data
   * @returns
   */
  signup(data) {
    return this.http
      .post(this.url + "signup", data)
      .pipe(map((results) => results));
  }
  signupWithfb(data) {
    return this.http.get(data).pipe(map((results) => results));
  }

  signupOP(data) {
    return this.http
      .post(this.url + "signupOP", data)
      .pipe(map((results) => results));
  }

  SignPhone(data) {
    return this.http
      .post(this.url + "SignPhone", data)
      .pipe(map((results) => results));
  }

  /**
   * Funciones para Recuperacion de cuenta / Verificacion de usuario
   * @param data
   * @returns
   */
  SendOtp(data) {
    return this.http
      .post(this.url + "sendOTP", data)
      .pipe(map((results) => results));
  }

  forgot(data) {
    return this.http
      .post(this.url + "forgot", data)
      .pipe(map((results) => results));
  }

  verify(data) {
    return this.http
      .post(this.url + "verify", data)
      .pipe(map((results) => results));
  }

  updatePassword(data) {
    return this.http
      .post(this.url + "updatePassword", data)
      .pipe(map((results) => results));
  }

  chkUser(data) {
    return this.http
      .post(this.url + "chkUser", data)
      .pipe(map((results) => results));
  }

  /**
   * Validacion de Usuario Logeado|Registrado
   * @returns
   */
  async chkLog(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (
        localStorage.getItem("user_id") &&
        localStorage.getItem("user_id") != null
      ) {
        this.chkUser({
          user_id: localStorage.getItem("user_id"),
          role: localStorage.getItem("role"),
        }).subscribe((req: any) => {
          if (req.msg != "not_exist") {
            localStorage.setItem("user_id", req.data.id);
            localStorage.setItem("role", req.role);
            localStorage.setItem("user_dat", JSON.stringify(req.data));
            resolve(true);
          } else {
            resolve(false);
          }
        });
      } else {
        resolve(false);
      }
    });
  }

  /**
   * Funciones para la obtencion de ciudades de servicio
   * @param data
   * @returns
   */
  city(data) {
    return this.http
      .get(this.url + "city?lid=" + localStorage.getItem("lid") + data)
      .pipe(map((results) => results));
  }

  updateCity(data) {
    return this.http
      .get(this.url + "updateCity?" + data)
      .pipe(map((results) => results));
  }

  GetNearbyCity(data) {
    return this.http
      .get(this.url + "GetNearbyCity?lid=" + localStorage.getItem("lid") + data)
      .pipe(map((results) => results));
  }

  ViewAllCats() {
    return this.http
      .get(this.url + "ViewAllCats")
      .pipe(map((results) => results));
  }

  viewSubCats(id: number) {

    console.log(this.url + "getCategory/" + id);

    return this.http
      .get(this.url + "getCategory/" + id)
      .pipe(map((results) => results));
  }

  viewSubCatsLast(url: string) {
    return this.http
      .get(this.url + "getSelectSubCatLast/" + url)
      .pipe(map((results) => results));
  }

  /**
   * Funciones para visualizar, Buscar Negocios|Proveedores
   * @param id
   * @returns
   */
  getStore(id) {
    return this.http
      .get(this.url + "getStore/" + id)
      .pipe(map((results) => results));
  }

  getDeliveryType($id) {
    return this.http
      .get(this.url + "getTypeDelivery/" + $id)
      .pipe(map((results) => results));
  }

  getStoreOpen(data) {
    return this.http
      .get(this.url + "getStoreOpen/" + data)
      .pipe(map((results) => results));
  }

  getMoreStores(city_id) {
    return this.http
      .get(this.url + "GetInfiniteScroll/" + city_id)
      .pipe(map((results) => results));
  }

  search(query, type, city) {
    return this.http
      .get(this.url + "search/" + query + "/" + type + "/" + city)
      .pipe(map((results) => results));
  }

  SearchCat(data) {
    return this.http
      .get(this.url + "SearchCat/" + data)
      .pipe(map((results) => results));
  }

  SearchFilters(data) {
    return this.http
      .get(this.url + "SearchFilters/" + data)
      .pipe(map((results) => results));
  }

  /**
   * Funciones para el carrito de compras
   * @param data
   * @returns
   */
  addToCart(data) {
    return this.http
      .post(this.url + "addToCart", data)
      .pipe(map((results) => results));
  }

  updateCart(id, type) {
    return this.http
      .get(this.url + "updateCart/" + id + "/" + type)
      .pipe(map((results) => results));
  }

  deleteAll(id) {
    return this.http
      .get(this.url + "deleteAll/" + id)
      .pipe(map((results) => results));
  }

  cartCount(cartNo) {
    return this.http
      .get(this.url + "cartCount/" + cartNo)
      .pipe(map((results) => results));
  }

  getCart(cartNo) {
    return this.http
      .get(this.url + "getCart/" + cartNo)
      .pipe(map((results) => results));
  }

  /**
   * Funciones para cupones de Descuento|Ofertas
   * @param cartNo
   * @returns
   */
  getOffer(cartNo) {
    return this.http
      .get(this.url + "getOffer/" + cartNo)
      .pipe(map((results) => results));
  }

  applyCoupen(id, cartNo) {
    return this.http
      .get(this.url + "applyCoupen/" + id + "/" + cartNo)
      .pipe(map((results) => results));
  }

  /**
   * Funcion para Crear, Editar, Eliminar Direcciones de entrega
   * @param id
   * @returns
   */
  getAddress(id) {
    return this.http
      .get(this.url + "getAddress/" + id)
      .pipe(map((results) => results));
  }

  getAllAdress(id) {
    return this.http
      .get(this.url + "getAllAdress/" + id)
      .pipe(map((results) => results));
  }

  saveAddress(data) {
    return this.http
      .post(this.url + "addAddress", data)
      .pipe(map((results) => results));
  }

  trashAddress(data) {
    return this.http
      .get(this.url + "removeAddress/" + data)
      .pipe(map((results) => results));
  }

  /**
   * Funciones del Chat
   * @param id
   * @returns
   */
  getChat(id) {
    const ref = this.db.database.ref("orders/" + id + "/chat");
    return ref;
  }

  setViewMsg(id, chat) {
    const ref = this.db.database.ref("orders/" + id + "/chat/" + chat);

    ref.update({
      status: 1,
    });
    return ref;
  }

  sendChat(id, data) {
    // return this.http.post(this.url+'sendChat',data)
    //          .pipe(map(results => results));
    const ref = this.db.database.ref("orders/" + id + "/chat/");

    ref.push(data);

    return ref;
  }

  /**
   * Funciones para calificacion de pedido
   * @param data
   * @returns
   */
  rating(data) {
    return this.http
      .post(this.url + "rate", data)
      .pipe(map((results) => results));
  }

  pages() {
    return this.http
      .get(this.url + "pages?lid=" + localStorage.getItem("lid"))
      .pipe(map((results) => results));
  }

  /**
   * Creacion de pagos con Stripe
   * @param token
   * @returns
   */
  makeStripePayment(token) {
    // makeStripePayment
    return this.http
      .get(this.url + "makeStripePayment" + token)
      .pipe(map((results) => results));
  }

  getStatus(id) {
    return this.http
      .get(this.url + "getStatus/" + id)
      .pipe(map((results) => results));
  }

  /**
   * OpenPay Methods
   * @param data
   * @returns
   */

  getClient(data) {
    return this.http
      .post(this.url + "getClient", data)
      .pipe(map((results) => results));
  }

  setCardClient(data) {
    return this.http
      .post(this.url + "SetCardClient", data)
      .pipe(map((results) => results));
  }

  GetCards(data) {
    return this.http
      .post(this.url + "GetCards", data)
      .pipe(map((results) => results));
  }

  DeleteCard(data) {
    return this.http
      .post(this.url + "DeleteCard", data)
      .pipe(map((results) => results));
  }

  getCard(data) {
    return this.http
      .post(this.url + "getCard", data)
      .pipe(map((results) => results));
  }

  chargeClient(data) {
    return this.http
      .post(this.url + "chargeClient", data)
      .pipe(map((results) => results));
  }

  getOpenPayCredentials() {
    return this.http
      .get(this.url + "openpay/data")
      .pipe(map((results) => results));
  }

  createSubscription() {}

  /**
   * Favorite Functions
   * @param data
   * @returns
   */
  SetFavorite(data) {
    return this.http
      .post(this.url + "SetFavorite", data)
      .pipe(map((results) => results));
  }

  GetFavorites(id) {
    return this.http
      .get(this.url + "GetFavorites/" + id)
      .pipe(map((results) => results));
  }

  TrashFavorite(id, user) {
    return this.http
      .get(this.url + "TrashFavorite/" + id + "/" + user)
      .pipe(map((results) => results));
  }

  /**
   * Functions Orders
   * @param data
   * @returns
   */

  order(data) {
    return this.http
      .post(this.url + "order", data)
      .pipe(map((results) => results));
  }

  Orderfs(data) {
    const ref = this.db.database.ref("orders/" + data);

    return ref;
  }

  cancelOrder(id, uid) {
    return this.http
      .get(this.url + "cancelOrder/" + id + "/" + uid)
      .pipe(map((results) => results));
  }

  myOrder(id) {
    return this.http
      .get(this.url + "myOrder/" + id)
      .pipe(map((results) => results));
  }

  /**
   * Mandaditos
   * @param data
   * @returns
   */
  OrderComm(data) {
    return this.http
      .post(this.url + "OrderComm", data)
      .pipe(map((results) => results));
  }

  ViewCostShipCommanded(data) {
    return this.http
      .post(this.url + "ViewCostShipCommanded", data)
      .pipe(map((results) => results));
  }

  chkEvents_comm(id) {
    return this.http
      .get(this.url + "chkEvents_comm/" + id)
      .pipe(map((results) => results));
  }

  chkEvents_staffs(data) {
    return this.http
      .post(this.url + "chkEvents_staffs", data)
      .pipe(map((results) => results));
  }

  cancelComm_event(id) {
    return this.http
      .get(this.url + "cancelComm_event/" + id)
      .pipe(map((results) => results));
  }

  rateComm_event(data) {
    return this.http
      .post(this.url + "rateComm_event", data)
      .pipe(map((results) => results));
  }
}
