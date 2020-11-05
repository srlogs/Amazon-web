import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
@Injectable({ providedIn: 'root' })

export class AuthGuardAdmin implements CanActivate {

    users : any;
    constructor(private route : Router) {

    }

    canActivate(route : ActivatedRouteSnapshot, state : RouterStateSnapshot) {
        const user = localStorage.getItem('admin');

        if(user) {
            return true;
        }
        this.route.navigate(['/']);
        return false;
    }
}