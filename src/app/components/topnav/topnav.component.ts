import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { LedgerHelper } from 'src/app/helper/ledgerhelper';
import { ApiService } from 'src/app/helper/api.service';
import { AppComponent } from 'src/app/app.component';
import { NavService } from './topnav.service';

@Component({
    selector: 'app-topnav',
    templateUrl: './topnav.component.html',
    styleUrls: ['./topnav.component.scss']
})
export class TopnavComponent implements OnInit {
    public pushRightClass: string;
    public username: string;

    constructor(
        public navService: NavService,
        public appComponent: AppComponent,
        public router: Router,
        private ledgerHelper: LedgerHelper,
        private apiService: ApiService) {
        this.router.events.subscribe(val => {
            if (val instanceof NavigationEnd && window.innerWidth <= 992 && this.isToggled()) {
                this.toggleSidebar();
            }
        });
    }

    ngOnInit() {
        this.pushRightClass = 'push-right';
        this.username = this.ledgerHelper.user_name;
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    onLoggedout() {
        this.apiService
            .logout(this.ledgerHelper.token)
            .then(() => {
                this.ledgerHelper.isLoggedin = 'false';
                this.ledgerHelper.token = '';
                this.appComponent.showSnackBar('Successfully logged out');
                // localStorage.removeItem('isLoggedin');
                this.router.navigate(['/login']);
            })
            .catch((err: unknown) => {
                this.appComponent.showSnackBar('Logout Failed');
            });

    }

    openFileDownload(){
        this.router.navigate(['/file-download'],{ replaceUrl:true});
    }

    openFileUpload(){
        this.router.navigate(['/file-upload'],{ replaceUrl:true});

    }

    openFileList(){
        this.router.navigate(['/file-list'],{ replaceUrl:true});
    }

   
}
