import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

import { AuthService } from "../services/auth.service";


@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

    constructor(
        private authService: AuthService,
        private router: Router
        ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // console.log('Authentication: ', this.authService.isAuthenticated())
        return true
        if (this.authService.isAuthenticated()) {
            return true;
        }
        // Re-direct to the LOGIN page and return false
        this.router.navigate(['login'], { queryParams: { returnUrl: state.url } });
        return false;
        // return true;
    }
}
