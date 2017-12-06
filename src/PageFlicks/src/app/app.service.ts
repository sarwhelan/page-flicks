import { Injectable, NgModule } from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {Http} from '@angular/http';


@NgModule({
  imports: [Http],
  providers: [CookieService]
})

@Injectable()
export class AppService {

  constructor(private cookieService : CookieService, private http: Http) {
    this.cookieService.set('account', 'false');
  }

  login(username, loginCallBackFunction) {
    this.http.get('http://localhost:8080/api/login?username=' + username)
      .subscribe(response => {
        loginCallBackFunction(response.json())
      });
  }


  search(key, searchCallBackFunction) {
    this.http.get('http://localhost:8080/api/search?key=' + key)
      .subscribe(response => {
        searchCallBackFunction(response.json());
      });
  }

  topReaders(topReaderCallBackFunction){
    this.http.get('http://localhost:8080/api/topReaders')
      .subscribe(response =>{
        topReaderCallBackFunction(response.json());
      })
  }

  loadWishList(loadWishListCallBackFunction){
    this.http.get('http://localhost:8080/api/loadWishList?user='+this.cookieService.get('account'))
      .subscribe(response =>{
        loadWishListCallBackFunction(response.json());
      })
  }

  downloadFromWishList(bookTitle, downloadFromWishListCallBackFunction) {
    this.http.get('http://localhost:8080/api/downloadFromWishList?user='+this.cookieService.get('account')+'&bookTitle='+bookTitle)
      .subscribe(response=>{
        downloadFromWishListCallBackFunction(response.json());
      })
  }

  viewRecommendedBooks(viewRecommendedBooksCallBackFunction){
    this.http.get('http://localhost:8080/api/recommendedBooks?user='+this.cookieService.get('account'))
      .subscribe(response =>{
        viewRecommendedBooksCallBackFunction(response.json());
      });
  }

  getPaymentInfo(getPaymentInfoCallBackFunction){
    this.http.get('http://localhost:8080/api/paymentInfo?user='+this.cookieService.get('account'))
      .subscribe(response =>{
        getPaymentInfoCallBackFunction(response.json());
      })
  }

  updatePaymentInfo(creditCardNumber, updatePaymentInfoCallBackFunction){
    this.http.post('http://localhost:8080/api/updatePayment', {
      creditCardNum : creditCardNumber,
      email: this.cookieService.get('account')
    }).subscribe(response => {
      updatePaymentInfoCallBackFunction(response.json());
    })
  }

  closeApp(closeCallBackFunction){
    this.http.delete('http://localhost:8080/api/close')
      .subscribe(response =>{
        closeCallBackFunction(response.json());
      })

  }

}
