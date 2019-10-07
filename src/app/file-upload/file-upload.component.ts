import { Component, OnInit } from '@angular/core';
import { ApiService } from '../helper/api.service';
import { Document } from '../model/Document';
import { LedgerHelper } from '../helper/ledgerhelper';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  constructor(
    private appComponent: AppComponent,
    private apiService: ApiService,
    private ledgerHelper: LedgerHelper,
    private router: Router,
    private spinnerService: Ng4LoadingSpinnerService
  ) { }

  ngOnInit() {
    console.log(JSON.parse(this.ledgerHelper.filesList));
  }

  files: Array<Document> = [];


  deleteAttachment(index) {
    // this.files.splice(index, 1);
    // delete file here
    this.files.splice(index, 1);
  }


  uploadFile(event) {

    this.spinnerService.show();
    console.log('spinner show');

    if (!event.length) {
      // attach code
      const fileList: FileList = event.target.files;
      console.log('attach code');
      console.log(fileList.length);
      for (let index = 0; index < fileList.length; index++) {

        const file: File = fileList[index];
        console.log('file ' + index);
        console.log(file);
        const reader = new FileReader();
        reader.readAsBinaryString(file);

        reader.onload = (e: any) => {
          const binaryData = e.target.result;
          const base64String = window.btoa(binaryData);
          console.log('base 64 ' + base64String);

          const doc: Document = {
            id: '',
            title: '',
            ref: '',
            name: file.name,
            base64: base64String
          };

          this.files.push(doc);
        }

      }
    }
    else {
      // drag drop code
      console.log('drag drop code');
      console.log(event)

      for (let index = 0; index < event.length; index++) {

        const file: File = event[index];
        console.log('file ' + index);
        console.log(file);
        const reader = new FileReader();
        reader.readAsBinaryString(file);

        reader.onload = (e: any) => {
          const binaryData = e.target.result;
          const base64String = window.btoa(binaryData);
          console.log('base 64 ' + base64String);

          const doc: Document = {
            id: '',
            title: '',
            ref: '',
            name: file.name,
            base64: base64String
          };


          this.files.push(doc);

        }
      }

    }

    this.spinnerService.hide();
    console.log('spinner hide');

  }


  async uploadDocumetToServer() {

    this.spinnerService.show();
    console.log('spinner show');


    console.log(this.files);
    for (let index = 0; index < this.files.length; index++) {
      // upload file 
      // write gets called 3 times and then response is replaced
      await this.apiService.write(this.files[index].base64)
        .then(resp => {
          // add files to pref here
          console.log('--reference-' + resp);
          // update the reference in doc 
          console.log('---file before---');
          console.log(JSON.stringify(this.files[index]));
          this.files[index].ref = resp;
          console.log('---file after---');
          console.log(JSON.stringify(this.files[index]));
          // add update doc to pref list 
          this.addDocToPrefList(this.files[index]);

          this.appComponent.showSnackBar('File ' + this.files[index].name + ' uploaded');
        })
        .catch(error => {
          this.appComponent.showSnackBar('File upload failed');
          console.log(error);
        })
        .finally(() => {
          this.spinnerService.hide();
          console.log('spinner hide');
          this.router.navigate(['/file-list'], { replaceUrl: true });

        });

    }

   



  }

  addDocToPrefList(document: Document) {
    let fileList = JSON.parse(this.ledgerHelper.filesList);
    console.log('---file list---');
    console.log(fileList);
    document.id = fileList.length;
    fileList.push(document);
    this.ledgerHelper.filesList = JSON.stringify(fileList);
    console.log('---file list after---');
    console.log(JSON.parse(this.ledgerHelper.filesList));
  }



}
