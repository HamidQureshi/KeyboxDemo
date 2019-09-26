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

    genSharableLink() {

        console.log(this.data.filename);
        console.log(this.data.reference);
        console.log(this.receiverName);

        this.apiService
            .share(this.data.reference, this.receiverName)
            .then(response => {
                this.link = response + '/' + this.data.filename;
            })
            .catch(error => {
                // this.appComponent.showSnackBar('File share failed');
                console.log(error);
            });


    }
}
