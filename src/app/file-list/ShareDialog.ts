import { Component, Inject } from '@angular/core';
import { ApiService } from '../helper/api.service';
import { MAT_DIALOG_DATA } from '@angular/material';
import { AppComponent } from '../app.component';
@Component({
    selector: 'share-dialog-content',
    templateUrl: 'share-dialog-content.html',
})
export class ShareDialog {
    constructor(
        private apiService: ApiService,
        // private appComponent: AppComponent,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
    }

    receiverName: string;
    link: string;
    shareWithAnyone: false;

    anyone = 'anyone';

    genSharableLink() {

        console.log(this.data.filename);
        console.log(this.data.reference);

        if (this.shareWithAnyone) {
            this.receiverName = this.anyone;
            this.link = 'https://datawhere.online/public/';
        }

        console.log(this.receiverName);

        this.apiService
            .share(this.data.reference, this.receiverName)
            .then(response => {
                this.link = (!this.link ? '' : this.link) + response + '/' + this.data.filename;
            })
            .catch(error => {
                // this.appComponent.showSnackBar('File share failed');
                console.log(error);
            });


    }
}
