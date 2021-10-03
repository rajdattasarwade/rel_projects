import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IconsModel } from '../../../../components/common/common-models';
import { CustomToastSnackbarComponent } from '../../../../components/shared/custom-toast-snackbar/custom-toast-snackbar.component';
import { PersonalDetailsService } from '../../services/personal-details.service';
import { Subscription } from 'rxjs';
import { myMgrDetails, subordinateDetails } from '../../personal-details.model';

@Component({
  selector: 'app-my-team-root',
  templateUrl: './my-team-root.component.html',
  styleUrls: ['./my-team-root.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MyTeamRootComponent implements OnInit {
  public subscriptionsList: Subscription[] = []; // to unsubscribe API calls
  iconsMain: any;
  myMgrDetails: any;
  subordinateDet: any;
  subOrdinateCount: number = 1;
  labelName:string;

  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    public personalDetService: PersonalDetailsService
  ) {
    this.iconsMain = [];
    this.iconsMain.push(new IconsModel('', 'Edit', 'ico-extra-small edit-white-ico', 'edit'));
  }


  ngOnInit(): void {
    this.getMyManagerDetails();
    this.getSubordinate();
  }

  openSnackBar() {
    let message = 
      'Your Manager Validation is pending with the HRBP. Once Validated, Your Old Manager’s name will removed.<br><br>'
      + 'New Subordinate addition pending with HRBP.';
    this._snackBar.openFromComponent(CustomToastSnackbarComponent, {
      duration: 10000,
      panelClass: ['info-outline-snackbar'],
      data: {
        title: 'Info',
        message: message
      },
    });
  }

  actionEventMain(event) {
    if (event == 'edit') {
      this.router.navigate(['/personal-details/my-team']);
    }
  }

  getMyManagerDetails(){
    this.subscriptionsList.push(
      this.personalDetService.getCurrentManager().subscribe((data) => {
        if (data) {  
          this.myMgrDetails = data;
          myMgrDetails.mgrDetailsData = this.myMgrDetails;  
        }
        (error) => {
          console.log();
        };
      })
    );
  }

  getSubordinate(){
    this.subscriptionsList.push(
      this.personalDetService.getSubordinates().subscribe((data) => {
        if (data) {  
          this.subordinateDet = data;
          subordinateDetails.subordinateDetailsData = this.subordinateDet;  
          if(this.subOrdinateCount < this.subordinateDet.length){
            this.labelName="Show More";
          }
        }
        (error) => {
          console.log();
        };
      })
    );
  }

  showMoreSubordinate(){
    if(this.labelName =="Show More"){
      this.subOrdinateCount = this.subordinateDet.length;
      this.labelName ="Show Less"
    } else {
      this.subOrdinateCount = 1;
      this.labelName ="Show More"
    }
  }

}
