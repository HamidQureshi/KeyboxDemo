import { Component, OnInit } from '@angular/core';
import { ApiService } from '../helper/api.service';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})
export class PublicComponent implements OnInit {

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private appComponent: AppComponent,
    private router: Router
  ) { }

  message: string;

  reference: string;
  fileName: string;

  ngOnInit() {
    this.message = 'Please wait while file is downloading';
    this.reference = this.route.snapshot.paramMap.get('reference');
    this.fileName = this.route.snapshot.paramMap.get('filename');
    this.login();
  }


  login() {

    const username = 'anyone';
    const password = 'A12345678!';

    const body = {
      username,
      password
    };

    console.log('login details = ' + JSON.stringify(body));

    this.apiService
      .login(body)
      .then((token: string) => {

        console.log('token =' + token);

        this.downloadDocumet(token);

      })
      .catch((err: unknown) => {
        // this.appComp.showSnackBar('Wrong credentials');
      });

  }

  downloadDocumet(token: string) {

    console.log(this.reference);
    this.apiService.read_anyone(this.reference, token)
      .then(response => {
        console.log(response);

        const linkSource = 'data:application/.js;base64,' + response;
        const downloadLink = document.createElement('a');
        document.body.appendChild(downloadLink);

        const fileName = this.fileName;

        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();

        this.appComponent.showSnackBar('File Downloaded');
        this.router.navigate(['/login']);

      })
      .catch(error => {
        this.appComponent.showSnackBar('File Download Failed');
        console.log(error);
      });
  }


}
