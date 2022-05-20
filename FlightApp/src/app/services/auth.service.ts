import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NewUserData } from '../models/NewUserData';
import { UserData } from '../models/UserData';

@Injectable()
export class AuthService {

    private _registerUrl = "http://localhost:26682/api/user/register";
    private _loginUrl = "http://localhost:26682/api/user/login";

    /**
     *
     */
    constructor(private http: HttpClient, private _router: Router) {


    }


    loginUser(user: any) {
        return this.http.post<any>(this._loginUrl, user)
    }

    registerUser(user: any) {
        console.log(user);
        return this.http.post<any>(this._registerUrl, user)
    }

    logoutUser() {
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        localStorage.removeItem('roleId')
        this._router.navigate(['/search'])
    }

    getToken() {
        return localStorage.getItem('token')
    }
    loggedIn() {
        return !!localStorage.getItem('token')
    }

    adminLoggedIn() {
        if (!!localStorage.getItem('token') && localStorage.getItem('roleId') == "1")
            return true;
        else
            return false;
    }

    userLoggedIn() {
        if (!!localStorage.getItem('token') && localStorage.getItem('roleId') == "2")
            return true;
        else
            return false;
    }
}