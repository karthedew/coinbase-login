import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { Observable, throwError, BehaviorSubject, pipe } from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';
// import { AuthService } from "./services/auth.service";

/**
 * 
 * Authenitcation HTTP interceptor that will:
 * 
 * 
 * 1. Set authorization HTTP header before making a request
 * 2. update expirsed access tokenand retry failed request.
 * 
 */
@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {

    private isRefreshing: boolean = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(
        private authService: AuthService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      console.log('You are in the interceptor: ', request.url)

      if (request.url.indexOf('/graphql') > -1) {

        console.log('You are making a GraphQL request')

        if (this.authService.getJwtToken()) {
            request = this.addToken(request, this.authService.getJwtToken());

            const jwt = this.authService.getJwtToken();

            console.log('Your jwt in your request: ', jwt);
            
            const clone = request.clone({
              setHeaders: {
                'Authorization': `Bearer ${this.authService.getJwtToken()}`
              }
            })

            console.log(clone.headers);

            return next.handle(clone)

            // .pipe(catchError(error => {
            //   if(error instanceof HttpErrorResponse && error.status === 401) {
                
            //   } else {
            //     return throwError(error);
            //   }
            // }));
        }

        
      }

      console.log('You are making a Coinbase POST Request')

      return next.handle(request);

      // if (this.authService.getJwtToken()) {
      //   request = this.addToken(request, this.authService.getJwtToken());
      // }
    
      // return next.handle(request).pipe(catchError(error => {
      //   if (error instanceof HttpErrorResponse && error.status === 401) {
      //     // return this.handle401Error(request, next);
      //     return 'request';
      //   } else {
      //     return throwError(error);
      //   }
      // }));
    }

    private addToken(request: HttpRequest<any>, token: string) {
        return request.clone({
          setHeaders: {
            'Authorization': `Bearer ${token}`
          }
        });
      }

    

    // private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    //     if (!this.isRefreshing) {
    //       this.isRefreshing = true;
    //       this.refreshTokenSubject.next(null);
    
    //       return this.authService.refreshToken().pipe(
    //         switchMap((token: any) => {
    //           this.isRefreshing = false;
    //           this.refreshTokenSubject.next(token.jwt);
    //           return next.handle(this.addToken(request, token.jwt));
    //         }));
    
    //     } else {
    //       return this.refreshTokenSubject.pipe(
    //         filter(token => token != null),
    //         take(1),
    //         switchMap(jwt => {
    //           return next.handle(this.addToken(request, jwt));
    //         }));
    //     }
    //   }

}