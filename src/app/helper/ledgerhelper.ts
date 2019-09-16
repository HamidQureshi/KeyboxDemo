// import { PersistenceService, StorageType } from 'angular-persistence';
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})

export class LedgerHelper {

    // constructor(private persistenceService: PersistenceService) {
    constructor() {
        console.log('ledger helper const called');
    }

    appID = 'KeyBox';
    baseURL = 'https://api.keybox.co/api';

    // baseURL2= 'https://poc.keybox.co';

    loginUrl = this.baseURL + '/login';
    signUpUrl = this.baseURL + '/users';
    logoutUrl = this.baseURL + '/logout/';
    writeFileUrl = this.baseURL + '/write';
    inspect = this.baseURL + '/inspect/';
    whoAmIUrl = this.baseURL + '/whoami';
    changePasswordUrl = this.baseURL + '/users/changePassword';
    forgotPasswordUrl = this.baseURL + '/users/forgotPassword/';
    resetPasswordUrl = this.baseURL + '/users/resetPassword';


    nameSpace = 'demoNamespace';

    get account_type(): string {
        return localStorage.getItem('account_type' + this.appID);
    }
    set account_type(account_type: string) {
        localStorage.setItem('account_type' + this.appID, account_type);
    }

    get _id(): string {
        return localStorage.getItem('_id' + this.appID);
    }
    set _id(_id: string) {
        localStorage.setItem('_id' + this.appID, _id);
    }

    get file(): string {
        return localStorage.getItem('file' + this.appID);
    }
    set file(file: string) {
        localStorage.setItem('file' + this.appID, file);
    }

    get filesList(): string {
        // if (this.persistenceService.get('reportlist' + this.appID )) {
        //     return '[]';
        // }
        return !localStorage.getItem('filesList' + this.appID) ? '[]' : localStorage.getItem('filesList' + this.appID);

        // return !this.persistenceService.get('filesList' + this.appID )? '[]':this.persistenceService.get('filesList' + this.appID );

    }
    set filesList(files: string) {
        localStorage.setItem('filesList' + this.appID, files);

        // this.persistenceService.set('filesList' + this.appID , files);
        // this.persistenceService.set('reportlist', reports, { type: StorageType.SESSION });

    }

    get email(): string {
        return localStorage.getItem('email' + this.appID);
    }
    set email(email: string) {
        localStorage.setItem('email' + this.appID, email);
    }

    get first_name(): string {
        return localStorage.getItem('first_name' + this.appID);
    }
    set first_name(first_name: string) {
        localStorage.setItem('first_name' + this.appID, first_name);
    }

    get last_name(): string {
        return localStorage.getItem('last_name' + this.appID);
    }
    set last_name(last_name: string) {
        localStorage.setItem('last_name' + this.appID, last_name);
    }

    get user_name(): string {
        return localStorage.getItem('user_name' + this.appID);
    }
    set user_name(user_name: string) {
        localStorage.setItem('user_name' + this.appID, user_name);
    }

    get token(): string {
        return localStorage.getItem('Token' + this.appID);
    }
    set token(token: string) {
        localStorage.setItem('Token' + this.appID, token);
    }

    get isLoggedin(): string {
        return localStorage.getItem('isLoggedin' + this.appID);
    }
    set isLoggedin(isLoggedin: string) {
        localStorage.setItem('isLoggedin' + this.appID, isLoggedin);
    }

    get profileCreated(): string {
        return localStorage.getItem('profileCreated' + this.appID);
    }
    set profileCreated(profileCreated: string) {
        localStorage.setItem('profileCreated' + this.appID, profileCreated);
    }

}