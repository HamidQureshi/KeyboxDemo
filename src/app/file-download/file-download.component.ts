import { Component, OnInit } from '@angular/core';
import { ApiService } from '../helper/api.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-file-download',
  templateUrl: './file-download.component.html',
  styleUrls: ['./file-download.component.scss']
})
export class FileDownloadComponent implements OnInit {

  reference: string;
  name: string;
  status: string;
  fragments: string[];
  hidden = true;

  constructor(
    private appComponent: AppComponent,
    private apiService: ApiService
  ) { }

  ngOnInit() {
  }

  downloadDocumet() {
    console.log(this.reference);
    this.apiService.read(this.reference)
      .then(response => {
        console.log(response);

        const linkSource = 'data:application/.js;base64,' + response;
        const downloadLink = document.createElement('a');
        const fileName = this.name;

        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();

        this.appComponent.showSnackBar('File Downloaded');

      })
      .catch(error => {
        this.appComponent.showSnackBar('File Download Failed');

        console.log(error);
      });
  }

  inspectDocumet() {

    if (!this.reference) {
      this.appComponent.showSnackBar('Enter a refernce to File first');
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
