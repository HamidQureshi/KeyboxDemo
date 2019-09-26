import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  MatTableDataSource,
  MatPaginator,
  MatSort,
  MatDialog
} from '@angular/material';
import { Document } from '../model/Document';
import { NavService } from '../components/topnav/topnav.service';
import { LedgerHelper } from '../helper/ledgerhelper';
import { ShareDialog } from './ShareDialog';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.scss']
})
export class FileListComponent implements OnInit {

  displayedColumns = ['id', 'name', 'ref', 'share'];

  dataSource: MatTableDataSource<Document>;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  files: Array<Document> = [];

  constructor(
    private navService: NavService,
    private ledgerHelper: LedgerHelper,
    private router: Router,
    public shareDialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.navService.show();
    this.files = JSON.parse(this.ledgerHelper.filesList);
    console.log(this.files);
    this.dataSource = new MatTableDataSource(this.files);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  uploadFile() {
    this.router.navigate(['/file-upload'], { replaceUrl: true });
  }

  getRecord(row) {
    console.log(row);
    this.ledgerHelper.file = JSON.stringify(row);
    // this.router.navigate(['/file-detail'], { replaceUrl: true });

  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  shareDocument(row) {
    if (!row) {
      return;
    }
    this.ledgerHelper.file = JSON.stringify(row);
    // this.router.navigate(['/file-detail'], { replaceUrl: true });

    const dialogRef = this.shareDialog.open(ShareDialog, {
      data: {
        filename: row.name,
        reference: row.ref
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}

