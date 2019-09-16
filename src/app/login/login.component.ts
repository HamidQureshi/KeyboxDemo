import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../helper/api.service';
import { LedgerHelper } from '../helper/ledgerhelper';
import { AppComponent } from '../app.component';
import { NavService } from '../components/topnav/topnav.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


@Injectable()
export class LoginComponent implements OnInit {
  constructor(private router: Router,
    private navService: NavService,
    private http: HttpClient,
    private apiService: ApiService,
    private ledgerHelper: LedgerHelper,
    private appComp: AppComponent) { }

  ngOnInit() {
    this.navService.hide();
  }

  onLogin(username, password) {

    const body = {
      username,
      password
    };

    console.log('login details = ' + JSON.stringify(body));

    this.apiService
      .login(body)
      .then((token: string) => {
        this.apiService
          .whoAmI()
          .then((user: any) => {
            console.log('--whoami--' + JSON.stringify(user));

            this.ledgerHelper._id = '' + user.id;
            this.ledgerHelper.first_name = '' + user.firstname;
            this.ledgerHelper.last_name = '' + user.lastname;
            this.ledgerHelper.email = '' + user.email;
            this.ledgerHelper.account_type = '' + user.accountType;
          })
          .catch();
        console.log('token =' + token);
        this.ledgerHelper.user_name = '' + username;
        this.ledgerHelper.token = token;
        this.ledgerHelper.isLoggedin = '' + true;
        this.ledgerHelper.profileCreated = '' + true;
        this.router.navigate(['/file-list']);
        this.appComp.showSnackBar('Successfully logged in');
      })
      .catch((err: unknown) => {
        this.ledgerHelper.isLoggedin = '' + false;
        this.appComp.showSnackBar('Wrong credentials');
      });


  }

  onRegister() {
    this.router.navigate(['/register']);
  }

}
