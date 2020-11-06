import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
@Injectable({ providedIn: 'root' })

export class AuthGuard implements CanActivate {

    users : any;
    constructor(private route : Router) {

    }

    canActivate(route : ActivatedRouteSnapshot, state : RouterStateSnapshot) {
        const user = localStorage.getItem('currentUser');
        this.users = JSON.parse(localStorage.getItem('users')) ||[];
        let temp = this.users.find(x => x.email === user);
        //console.log("authguard", temp);
        if(temp) {
            return true;
        }
        this.route.navigate(['/']);
        return false;
    }
}