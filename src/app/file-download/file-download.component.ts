import { Component, OnInit } from '@angular/core';
import { ApiService } from '../helper/api.service';
import { AppComponent } from '../app.component';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-file-download',
  templateUrl: './file-download.component.html',
  styleUrls: ['./file-download.component.scss']
})
export class FileDownloadComponent implements OnInit {

  documentLink: string;
  status: string;
  fragments: string[];
  hidden = true;

  reference: string;
  fileName: string;

  constructor(
    private appComponent: AppComponent,
    private apiService: ApiService,
    private spinnerService: Ng4LoadingSpinnerService
  ) { }

  ngOnInit() {
  }

  parseLink(link: string) {
    const metaData = link.split('/');
    console.log(metaData);
    this.reference = metaData[0];
    this.fileName = metaData[1];
    return metaData;
  }

  downloadDocumet() {
    if (!this.documentLink) {
      this.appComponent.showSnackBar('Enter a link to File first');
      return;
    }
    this.spinnerService.show();
    console.log(this.documentLink);

    this.parseLink(this.documentLink);


    console.log(this.reference);
    this.apiService.read(this.reference)
      .then(response => {
        console.log(response);

        const linkSource = 'data:application/.js;base64,' + response;
        const downloadLink = document.createElement('a');
        document.body.appendChild(downloadLink);
        const fileName = this.fileName;

        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
        this.spinnerService.hide();

        this.appComponent.showSnackBar('File Downloaded');

      })
      .catch(error => {
        this.spinnerService.hide();

        this.appComponent.showSnackBar('File Download Failed');

        console.log(error);
      });
  }

  inspectDocumet() {

    this.parseLink(this.documentLink);

    if (!this.reference) {
      this.appComponent.showSnackBar('Enter a link to File first');
      return;
    }

    this.apiService.inspect(this.reference)
      .then(response => {
        this.hidden = false;
        this.status = response.health;
        this.fragments = response.fragbits;

      })
      .catch(error => {
        this.appComponent.showSnackBar('File inspection failed');

        console.log(error);
      });
  }


}
