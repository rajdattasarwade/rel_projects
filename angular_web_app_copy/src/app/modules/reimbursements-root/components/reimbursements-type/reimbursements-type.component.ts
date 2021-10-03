import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ReimbursementsTypeDetails } from '../../utils/reimbursements.model';
import { ReimbursementsService } from '../../services/reimbursements.service';
import { ReimbursementsConstants } from '../../utils/reimbursements.constants';
import { Router } from '../../../../../../node_modules/@angular/router';
import { DailyFieldIncidentalExpenseComponent } from '../reimbursements-forms/daily-field-incidental-expense/daily-field-incidental-expense.component';
import { MatDialog } from '@angular/material/dialog';
import { GuestTravelExpensesComponent } from '../reimbursements-forms/guest-travel-expenses/guest-travel-expenses.component';
import { LocalConveyanceComponent } from '../reimbursements-forms/local-conveyance/local-conveyance.component';
import { OtherReimbursementComponent } from '../reimbursements-forms/other-reimbursement/other-reimbursement.component';
import { KitAllowanceComponent } from '../reimbursements-forms/kit-allowance/kit-allowance.component';
import { HandsetReimbursementComponent } from '../reimbursements-forms/handset-reimbursement/handset-reimbursement.component';
import { PreEmpMedicalComponent } from '../reimbursements-forms/pre-emp-medical/pre-emp-medical.component';
import { LtaComponent } from '../reimbursements-forms/lta/lta.component';
import { ManagerialMedicalAllowanceComponent } from '../reimbursements-forms/managerial-medical-allowance/managerial-medical-allowance.component';

@Component({
  selector: 'app-reimbursements-type',
  templateUrl: './reimbursements-type.component.html',
  styleUrls: ['./reimbursements-type.component.css'],
})
export class ReimbursementsTypeComponent implements OnInit {
  rembTypeDetails: ReimbursementsTypeDetails[];
  selectedRembType: any = [];
  @Output() submitForm = new EventEmitter();
  @Output() eligibilityData = new EventEmitter();
  constructor(
    private reimbursmentService: ReimbursementsService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getReimbursementsType();
  }

  getReimbursementsType() {
    this.reimbursmentService.getRembTypeDetails().subscribe(
      (data: ReimbursementsTypeDetails[]) => {
        if (data.length > 0) {
          this.rembTypeDetails = data;
          this.showRembTypeCards();
          if (this.rembTypeDetails.length > 0) {
            this.eligibilityData.emit();
          }
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
  //set Style property dynamically
  showRembTypeCards() {
    for (let selectedRembType of ReimbursementsConstants.REIMBURSEMENTS_TYPE) {
      let rembTypeAvailable = false;
      for (let rembTypeObj of this.rembTypeDetails) {
        if (
          rembTypeObj.reimbursementText == selectedRembType.reimbursementText
        ) {
          rembTypeAvailable = true;
          rembTypeObj.bgColor = selectedRembType.bgColor;
          rembTypeObj.icon = selectedRembType.icon;
          rembTypeObj.imgUrl = selectedRembType.imgUrl;
          this.selectedRembType.push(rembTypeObj);
          if (selectedRembType.sapCode == 'ZSOH') {
            this.reimbursmentService.setSohoEligibility(rembTypeObj);
          }
        }
      }
      if (rembTypeAvailable == false) {
        let setTypeObj = selectedRembType;
        this.selectedRembType.push(setTypeObj);
      }
    }
  }
  reimbursementsForms(typeCardDetail) {
    if (typeCardDetail.reimbursementText == 'Daily Field Incidental Expenses') {
      const dialogRef = this.dialog.open(DailyFieldIncidentalExpenseComponent, {
        width: '683px',
      });
    } else if (typeCardDetail.reimbursementText == 'Guest - Travel Expenses') {
      const dialogRef = this.dialog.open(GuestTravelExpensesComponent, {
        width: '683px',
      });
      dialogRef.componentInstance.typeDetails = typeCardDetail;
    } else if (typeCardDetail.reimbursementText == 'Kit Allowance') {
      const dialogRef = this.dialog.open(KitAllowanceComponent, {
        width: '683px',
      });
      //dialogRef.componentInstance.callBack=() =>{
      //this.submitForm.emit()
      //}
    } else if (
      typeCardDetail.reimbursementText == 'Local Conveyance & Toll Tax'
    ) {
      const dialogRef = this.dialog.open(LocalConveyanceComponent, {
        width: '683px',
      });
    } else if (typeCardDetail.reimbursementText == 'Handset Reimbursement') {
      // const dialogRef = this.dialog.open(HandsetReimbursementComponent, {
      //   width: '683px'
      // });
      const dialogRef = this.dialog.open(GuestTravelExpensesComponent, {
        width: '683px',
      });
      dialogRef.componentInstance.typeDetails = typeCardDetail;
    } else if (typeCardDetail.reimbursementText == 'Pre Emp Medical') {
      const dialogRef = this.dialog.open(PreEmpMedicalComponent, {
        width: '683px',
      });
    } else if (typeCardDetail.reimbursementText == 'Other Reimbursement') {
      const dialogRef = this.dialog.open(OtherReimbursementComponent, {
        width: '683px',
      });
    } else if (typeCardDetail.reimbursementText == 'Leave Travel Allowance') {
      const dialogRef = this.dialog.open(LtaComponent, {
        width: '1055px',
      });
    } else if (
      typeCardDetail.reimbursementText == 'Managerial Medical Allowance'
    ) {
      const dialogRef = this.dialog.open(ManagerialMedicalAllowanceComponent, {
        width: '683px',
      });
    }
  }
}
