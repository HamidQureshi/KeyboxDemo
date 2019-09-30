import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FileListComponent } from './file-list/file-list.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { FileDownloadComponent } from './file-download/file-download.component';
import { PublicComponent } from './public/public.component';


const routes: Routes = [
  {
    path: '',
    component: FileListComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'file-list',
    component: FileListComponent
  },
  {
    path: 'file-upload',
    component: FileUploadComponent
  },
  {
    path: 'file-download',
    component: FileDownloadComponent
  },
  {
    path: 'public',
    component: PublicComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
