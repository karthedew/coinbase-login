import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { queueScheduler } from 'rxjs';
import { Http2ServerRequest } from 'http2';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  readonly Request_Link = 'https://www.coinbase.com/oauth/authorize?';
  SECURE_RANDOM: any;

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {

    //want to check if user is logged in. We don't want to display this page if the user it logged in.
    const userLoggedIn = this.authService.isAuthenticated();

    if(userLoggedIn) {
      this.router.navigateByUrl('http://localhost:4200');
    }
  }


  checkValidate() {
    let URL_REDIRECT = 'http://localhost:4000/api/auth/coinbase';

    let params = new HttpParams().set('code', '12023890dff082f0wc829j')

    let results = this.http.get(URL_REDIRECT, { params }).subscribe(data => {
      console.log("The data from the response: ", data)
    })

    console.log('Should return the JwT Access and Refresh Tokens', results)
  }


  // https://www.coinbase.com/oauth/authorize
  //  - response_type=code
  //  - client_id=YOUR_CLIENT_ID
  //  - redirect_uri=YOUR_REDIRECT_URL
  //  - state=SECURE_RANDOM
  //  - scope=wallet:accounts:read
  coinbaseLogin() {
    localStorage.setItem('GitCrypto_Login', 'coinbase')
    const popup = window.open('http://localhost:4000/api/auth/coinbase/login',
                              '_blank',
                              'height=700,width=700');
  }

  gitlabLogin() {
    localStorage.setItem('GitCrypto_Login', 'gitlab')
    const popup = window.open('http://localhost:4000/api/auth/gitlab/login',
                              '_blank',
                              'height=700,width=700')
  }

  refreshParent() {
    window.opener.location.reload();
}

  customSignIn(token) {
    console.log('you got your token! ', token)
  }

  createUser() {
    let user = 'username'

    console.log(user)
  }

}
