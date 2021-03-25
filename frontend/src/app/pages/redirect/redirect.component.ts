import { Component, OnInit } from '@angular/core';

import { HttpClient, HttpParams } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from 'src/app/core/auth/services/auth.service';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent implements OnInit {

  constructor(
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): void {

    const loginType = localStorage.getItem('GitCrypto_Login')

    // --- COINBASE LOGIN ---
    if (loginType === 'coinbase') {
      const code = this.activatedRoute.snapshot.queryParamMap.get('code')
      this.makeCoinbaseLogin(code);
    }

    // --- GITLAB LOGIN ---
    if (loginType === 'gitlab') {
      console.log('You made a GitLab login request');
      this.makeGitlabLogin(this.activatedRoute.snapshot.fragment);

    }

    

    localStorage.removeItem('GitCrypto_Login');

    
    // console.log('Your second response:', results2)
  }

  coinbaseRes() {
    console.log('Hello')
  }

  makeGitlabLogin(fragment: any): void {

    // Split the incoming URL parameters.
    let s = fragment.split('&');

    // Get the individual parameters from the URL request.
    let access_token = s[0].split('=')[1];
    let token_type   = s[1].split('=')[1];
    let code         = s[2].split('=')[1];

    let URL_REDIRECT = 'http://localhost:4000/api/auth/gitlab';

    let params = new HttpParams().set('accessToken', access_token);

    console.log('you are making the login request for gitlab')

    this.makeLogin(URL_REDIRECT, params);

  }

  makeCoinbaseLogin(code: string): void {
    // Set Variables
    let URL_REDIRECT = 'http://localhost:4000/api/auth/coinbase';
    let params = new HttpParams().set('code', code);

    // Make the login query to the backend.
    this.makeLogin(URL_REDIRECT, params);
  }

  /*
    makeLogin: void

    This function makes an http GET request to the
    GitCrypto backend.
    
    PARAMETERS
    ----------

    URL_REDIRECT: string
        - The backend URL endpoint.

    params: HttpParams
        - The list of Http Parameters sent with the GET request.
  */
  makeLogin(URL_REDIRECT: string, params: HttpParams): void {
    console.log('You made it into makeLogin')
    let result = this.httpClient.get(URL_REDIRECT, { params: params }).subscribe(data => {
      console.log('you get it!!!!!!!!', data)
      // Store the JWT tokens from login.
      this.authService.storeJwtTokens(data);

      // Make the login TRUE.
      this.authService.updateLoggedIn(true);

      // Reload the original window and close the popup window.
      console.log('You need to close window')
      window.opener.location.reload();
      window.close();
    })
  }

}
