import { Component, NgModule } from '@angular/core';
import {AppService} from "./app.service";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppService, CookieService]
})
@NgModule({
  providers: [CookieService, AppService]
})


export class AppComponent {

  constructor(private appService: AppService, private cookieService : CookieService){}
  signedIn = false;
  username: string;
  searchCriteria: string;
  bookByAuthor = [];
  topReaderList = [];
  wishListBooks = [];
  recommendedBooks = [];
  creditCardNum;
  terminated = false;


  login(){
    this.appService.login(this.username, this.loginCallBackFunction.bind(this));
  }

  loginCallBackFunction(res : string){
    console.log(res);
    console.log("in login call back");
    console.log(this.username);
    this.cookieService.set('account', this.username);

    //update verification variable
    if(this.cookieService.get('account') !== 'false')
      this.signedIn = true;
  }

  search(){
    this.appService.search(this.searchCriteria, this.searchCallBackFunction.bind(this));
  }

  searchCallBackFunction(res :JSON){
    this.bookByAuthor = [];
    this.bookByAuthor.push(res[0][0].bookTitle);
  }

  topReader(){
    this.appService.topReaders(this.topReaderCallBackFunction.bind(this));
  }

  topReaderCallBackFunction(res :JSON){
    console.log(res);
    this.topReaderList = [];
    for(var i = 0; i < res[0].length; i++) {
      this.topReaderList.push(res[0][i].ReaderName + " read " + res[0][i].NumBooksRead + " books!");
    }
  }

  loadWishList(){
    this.appService.loadWishList(this.loadWishListCallBackFunction.bind(this));
  }

  loadWishListCallBackFunction(res:JSON){
    this.wishListBooks = [];
    console.log("res " + res);
    for(var i = 0; i < res[0].length; i++) {
      this.wishListBooks.push(res[0][i]);
    }
  }

  downloadFromWishList(bookTitle){
    console.log(bookTitle);
    this.appService.downloadFromWishList(bookTitle, this.downloadFromWishListCallBackFunction.bind(this));
  }

  downloadFromWishListCallBackFunction(res: string){
    console.log(res);
  }

  viewRecommendations(){
    this.appService.viewRecommendedBooks(this.viewRecommendationsCallBackFunction.bind(this));
  }

  viewRecommendationsCallBackFunction(res :JSON){
    this.recommendedBooks = [];
    for(var i = 0; i < res[0].length; i++) {
      this.recommendedBooks.push(res[0][i].bookTitle + " written by " + res[0][i].authorName);
    }
  }

  getPaymentInfo(){
    this.appService.getPaymentInfo(this.paymentInfoCallBackFunction.bind(this));
  }

  paymentInfoCallBackFunction(res: string){
    console.log(res);
  }

  updatePaymentInfo(){
    this.appService.updatePaymentInfo(this.creditCardNum, this.updatePaymentInfoCallBackFunction.bind(this));
  }

  updatePaymentInfoCallBackFunction(res :string){
    console.log(res);
  }

  close(){
    this.cookieService.set('account', 'false');
    this.appService.closeApp(this.closeCallBackFunction.bind(this));
  }

  closeCallBackFunction(res :JSON){
    this.terminated = true;
  }

}
