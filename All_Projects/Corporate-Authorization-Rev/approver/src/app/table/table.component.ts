import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import {
  MatDialog,
  MatDialogRef,
  MatDialogConfig,
} from '@angular/material/dialog';
import { NotificationService } from '../shared/notification.service';
import { DialogComponent } from './dialog/dialog.component';
import { ErrordialogComponent } from './errordialog/errordialog.component';

@Component({
  selector: 'app-table',
  // templateUrl: './table.component.html',
  templateUrl: './odataTable.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  odataDisplayedColumns: string[] = [
    'select',
    'Begda',
    'Endda',
    'PernrFrom',
    'EnameFrom',
    'BusinessFrom',
    'ClassFrom',
    'PernrTo',
    'EnameTo',
    'BusinessTo',
    'ClassTo',
    'PernrRequester',
    'EnameRequester',
    'RequestDate',
  ];
  odataDataSource: any = null;

  displayedColumns: string[] = [
    'select',
    'fromDate',
    'toDate',
    'fromEmployeeCode',
    'fromEmployeeName',
    'fromBusiness',
    'fromBusinessClass',
    'toEmployeeCode',
    'toEmployeeName',
    'toBusiness',
    'toBusinessClass',
    'requesterCode',
    'requesterName',
    'requestedDate',
  ];
  dataSource: any = null;

  selection = new SelectionModel(true, []);
  selectedRows = [];
  csrfToken;

  constructor(
    private dataService: DataService,
    private notificationService: NotificationService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getPendingData();
  }
  getPendingData() {
    // *Working with odata
    this.odataDataSource = null;
    this.dataService.getOdataPendingRequests().subscribe((response: any) => {
      //console.log(response.body.d.results);
      this.csrfToken = response.headers.get('X-CSRF-Token');
      this.selection.clear();
      this.odataDataSource = response.body.d.results;
    });

    // *This is for nodejs data
    // this.dataSource = [];
    // this.dataService.getPendingRequests().subscribe(
    //   (response: []) => {
    //     // console.log('Called Again');

    //     this.dataSource = new MatTableDataSource(
    //       response.map((res: {}) => {
    //         let newObj = res;
    //         newObj['fromBusiness'] = 'Retail';
    //         newObj['fromBusinessClass'] = 'SAP HR';
    //         newObj['toBusiness'] = 'Retail';
    //         newObj['toBusinessClass'] = 'Retail HR';
    //         newObj['requesterCode'] = '50048382';
    //         newObj['requesterName'] = 'Hiten Panchal';
    //         newObj['requestedDate'] = new Date();
    //         return newObj;
    //       })
    //     );
    //     // console.log(this.dataSource);
    //   },
    //   (error) => {
    //     this.dataSource = [];
    //     this.notificationService.warn(':: Error in retrieving data!!');
    //   }
    // );
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.odataDataSource.length;
    return numSelected === numRows;
    // *Working nodejs data
    // const numSelected = this.selection.selected.length;
    // const numRows = this.dataSource.data.length;
    // return numSelected === numRows;
  }
  selectAll() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.odataDataSource.forEach((row) => this.selection.select(row));

    //  * Nodejs data
    // this.isAllSelected()
    //   ? this.selection.clear()
    //   : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  openDialog(value) {
    const dialogConfig = new MatDialogConfig();
    //*To open this component inside dialog we need to instantialize in module
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    dialogConfig.minWidth = 'fit-content';
    if (value) {
      this.dataService.setToApprove();
    }
    if (!value) {
      this.dataService.setToReject();
    }
    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      result
        ? this.postRequest(value)
        : this.notificationService.success(':: Transaction Cancelled');
    });
  }

  openDialogError(value) {
    const dialogConfig = new MatDialogConfig();
    //*To open this component inside dialog we need to instantialize in module
    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    // dialogConfig.scrollStrategy.enable()
    dialogConfig.minWidth = '600px';
    if (value=="Approve") {
      //* For opening new request
      const dialogRef = this.dialog.open(ErrordialogComponent, dialogConfig);
      dialogRef.afterClosed().subscribe((result) => {
        this.getPendingData();
      });
    } else if(value=="Reject"){
      //* For opening delete request
      const dialogRef = this.dialog.open(ErrordialogComponent, dialogConfig);
      dialogRef.afterClosed().subscribe((result) => {
        this.getPendingData();
      });
    }
  }

  postRequest(value) {
    if (value) {
      this.approveRequest();
    } else {
      this.rejectRequest();
    }
  }

  approveRequest() {
    //*Here is the approval function
    let tempArray = [];
    let finalData = JSON.parse(JSON.stringify(this.selection.selected));
    //console.log(finalData); //* post this final data to backend in the format asked.
    // this.getFinalData(finalData);
    // console.log(finalData);
    //console.log(this.selection.selected); //*All the selected row will be here in an array
    // *Kindly call the post approval api here all the selected data is in final data
    finalData.forEach((data) => {
      delete data.__metadata;
      let dataArr = {
        PernrFrom : data.PernrFrom,
        ImUname : data.ImUname,
        PernrTo : data.PernrTo,
        StartDate : this.dataService.formatDate(Number(data.Begda.slice(6,19))),
        EndDate : this.dataService.formatDate(Number(data.Endda.slice(6,19))),
        Status: "",
        Message: data.Message
      }
      tempArray.push(dataArr);
    })
    //console.log(tempArray);
    let newPayload = {
      ImUname: '',
      Mode: 'APP',
      ApproverSaveHdrToItemNav: tempArray
    }
    console.log(newPayload);
    this.dataService.approveRequests(newPayload, this.csrfToken).subscribe(
      (response) => {
        console.log(response);
        //this.getPendingData();
        this.dataService.eDataSource = response;
        this.openDialogError("Approve");
        //this.notificationService.primary(':: Approved successfully!!');
      },
      (error) => {
        // * Harphool was asking to open a dialog here incase there was error in approving some of the requests.  and show the in the table the requests that havent been approved successfully. He was saying that multiple requests can be approved simultaneously so some requests may have some issues.
        this.notificationService.warn(':: Error while approving requests!!');
      }
    );
  }
  rejectRequest() {
    let tempArray = [];
    let finalData = JSON.parse(JSON.stringify(this.selection.selected));

    finalData.forEach((data) => {
      delete data.__metadata;
      let dataArr = {
        PernrFrom : data.PernrFrom,
        ImUname : data.ImUname,
        PernrTo : data.PernrTo,
        StartDate : this.dataService.formatDate(Number(data.Begda.slice(6,19))),
        EndDate : this.dataService.formatDate(Number(data.Endda.slice(6,19))),
        Status: "",
        Message: data.Message
      }
      tempArray.push(dataArr);
    })
    //console.log(tempArray);
    let newPayload = {
      ImUname: '',
      Mode: 'REJ',
      ApproverSaveHdrToItemNav: tempArray
    }

    this.dataService.rejectRequests(newPayload, this.csrfToken).subscribe(
      (response) => {
        this.dataService.eDataSource = response;
        this.openDialogError("Reject");
        //this.notificationService.info(':: Rejected successfully!!');
      },
      (error) => {
        // * Harphool was asking to open a dialog here incase there was error in rejecting some of the requests.  and show the in the table the requests that havent been rejected successfully. Dont bother about that now.
        this.notificationService.warn(':: Error while rejecting requests!!');
      }
    );
  }
  // ignore this code
  getFinalData(finalData) {
    finalData.forEach((data) => {
      delete data['fromBusiness'];
      delete data['fromBusinessClass'];
      delete data['toBusiness'];
      delete data['toBusinessClass'];
      delete data['requesterCode'];
      delete data['requesterName'];
      delete data['requestedDate'];
    });
    // console.log(finalData);
  }
}
