import { Component, OnInit, ViewChild, OnChanges, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ReimbursementsService } from '../../services/reimbursements.service';
import { ReimbursementsConstants } from "../../utils/reimbursements.constants";
import { GuestTravelExpensesComponent } from '../reimbursements-forms/guest-travel-expenses/guest-travel-expenses.component';
import { MatDialog } from '../../../../../../node_modules/@angular/material/dialog';
@Component({
  selector: 'app-reimbursements-list',
  templateUrl: './reimbursements-list.component.html',
  styleUrls: ['./reimbursements-list.component.css']
})
export class ReimbursementsListComponent implements OnInit, OnChanges {
  @Input() public rembList;
  @Input() public tabname;
  @Input() public triggerOverview;
  displayedColumns: string[] = ['Type', 'ClaimDate', 'ClaimStatus', 'ClaimNo', 'Attachments'];
  dataSource: any;
  onetimeCall: boolean = false;
  constructor(private reimbursmentService: ReimbursementsService,public dialog: MatDialog) { }

  ngOnInit() {
    console.log("rembList===>", this.rembList);
  }
  viewPDF(objData) {
    console.log("objData", objData);
  }

  reimbursementsFormsEdit(typeCardDetail) {
    if (typeCardDetail.reimbursementTypeKey.sapCode == 'ZGEX') {
      const dialogRef = this.dialog.open(GuestTravelExpensesComponent, {
        width: '683px'
      });
    //   dialogRef.componentInstance.typeDetails = typeCardDetail;
    //   dialogRef.componentInstance.setOperation = "Edit";
      
    }
  }

  ngOnChanges() {
  }
}

