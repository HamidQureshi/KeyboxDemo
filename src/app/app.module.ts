import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  MatTableModule,
  MatFormFieldModule,
  MatPaginatorModule
  , MatInputModule,
  MatSnackBarModule,
  MatButtonModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatMenuModule,
  MatListModule,
  MatIconModule,
  MatDialog,
  MatDialogModule,
} from '@angular/material';
import { LoginComponent } from './login/login.component';
import { TopnavComponent } from './components/topnav/topnav.component';
import { NavService } from './components/topnav/topnav.service';
import { FileListComponent } from './file-list/file-list.component';
import { NgxFabModule } from 'ngx-fab';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { DragDropDirective } from './file-upload/drag-drop.directive';
import { FileDownloadComponent } from './file-download/file-download.component';
import { ShareDialog } from './file-list/ShareDialog';


@NgModule({
  declarations: [
    AppComponent,
    TopnavComponent,
    LoginComponent,
    FileListComponent,
    FileUploadComponent,
    DragDropDirective,
    FileDownloadComponent,
    ShareDialog

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatMenuModule,
    MatListModule,
    NgxFabModule,
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatDialogModule

  ],
  entryComponents: [
    ShareDialog
  ],
  providers: [NavService],
  bootstrap: [AppComponent]
})
export class AppModule { }
