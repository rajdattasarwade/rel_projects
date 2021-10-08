import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-errordialog',
  templateUrl: './errordialog.component.html',
  styleUrls: ['./errordialog.component.css']
})
export class ErrordialogComponent implements OnInit {
  eTableDisplayedColumns: string[] = [
    'PernrFrom',
    'PernrTo',
    'StartDate',
    'EndDate',
    'Status',
    'Message'
  ];
  eTableDataSource: any = null;
  constructor(
    public dialogRef: MatDialogRef<ErrordialogComponent>,
    public dataService: DataService
  ) { }

  ngOnInit(): void {
    let dataSource = this.dataService.eDataSource;
    if(dataSource!=null){
      this.eTableDataSource = dataSource.d.ApproverSaveHdrToItemNav.results;
    }
    
  }

  onOkClick(): void {
    this.dialogRef.close(true);
  }
}
