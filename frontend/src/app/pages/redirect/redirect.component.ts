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
      console.log('You made a coinbase login request')

      const code = this.activatedRoute.snapshot.queryParamMap.get('code')
      console.log("Code from Coinbase:", code);

      let URL_REDIRECT = 'http://localhost:4000/api/auth/coinbase';

      let params = new HttpParams().set('code', code)

      let results = this.httpClient.get(URL_REDIRECT, { params: params }).subscribe(data => {
        console.log("The data from the response: ", data);
        this.authService.storeJwtTokens(data);
        this.authService.updateLoggedIn(true);

        window.opener.location.reload();
        window.close();
      })

      // console.log('Your response:', results)

    }

    // --- GITLAB LOGIN ---
    if (loginType === 'gitlab') {
      console.log('You made a GitLab login request')
      console.log(this.activatedRoute.snapshot.queryParams)

      const params = this.activatedRoute.params.subscribe(params => {
        console.log('Your params: ', params['access_token']);
      })
    }

    

    localStorage.removeItem('GitCrypto_Login');

    
    // console.log('Your second response:', results2)
  }

  coinbaseRes() {
    console.log('Hello')
  }

}
