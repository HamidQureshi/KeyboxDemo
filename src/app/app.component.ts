import { Component, OnInit } from '@angular/core';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { Router } from '@angular/router';
import { LedgerHelper } from './helper/ledgerhelper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'KeyboxDemo';

  // message = 'Snack Bar opened.';
  actionButtonLabel = 'Close';
  action = true;
  setAutoHide = true;
  autoHide = 2000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  addExtraClass = false;


  constructor(
    private router: Router,
    private ledgerHelper: LedgerHelper,
    public snackBar: MatSnackBar
  ) {

  }

  ngOnInit() {
    console.log('app is running');

    if (this.ledgerHelper.isLoggedin === 'true') {
      this.router.navigate(['/file-list']);

    } else {
      this.router.navigate(['/login']);
    }

  }

  showSnackBar(message) {
    const config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;
    this.snackBar.open(message, this.action ? this.actionButtonLabel : undefined, config);
  }
}
