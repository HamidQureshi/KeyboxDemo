import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { LedgerHelper } from 'src/app/helper/ledgerhelper';
import { ApiService } from '../../helper/api.service';
import { AppComponent } from 'src/app/app.component';
import { NavService } from './topnav.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

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
        private apiService: ApiService,
        private spinnerService: Ng4LoadingSpinnerService
    ) {
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
        this.spinnerService.show();
        this.apiService
            .logout(this.ledgerHelper.token)
            .then(() => {
                this.spinnerService.hide();
                this.ledgerHelper.isLoggedin = 'false';
                this.ledgerHelper.token = '';
                this.appComponent.showSnackBar('Successfully logged out');
                // localStorage.removeItem('isLoggedin');
                this.router.navigate(['/login']);
                this.ledgerHelper.resetAppID();
            })
            .catch((err: Error) => {
                this.spinnerService.hide();
                if (err.message === 'Request failed with status code 401') {
                    this.ledgerHelper.isLoggedin = 'false';
                    this.ledgerHelper.token = '';
                    this.appComponent.showSnackBar('Successfully logged out');
                    // localStorage.removeItem('isLoggedin');
                    this.router.navigate(['/login']);
                    return;
                }
                this.appComponent.showSnackBar('Logout Failed');
            });

    }

    openFileDownload() {
        this.router.navigate(['/file-download'], { replaceUrl: true });
    }

    openFileUpload() {
        this.router.navigate(['/file-upload'], { replaceUrl: true });

    }

    openFileList() {
        this.router.navigate(['/file-list'], { replaceUrl: true });
    }


}
