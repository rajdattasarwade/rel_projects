import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FamilyDetailsPageComponent } from '../family-details-page/family-details-page.component';
import { AddEditDependentModel } from '../family-details-model';
import { PersonalDetailsService } from '../../../services/personal-details.service';
import { AddFamilyDependentModalComponent } from '../add-family-dependent-modal/add-family-dependent-modal.component';
import { Subscription } from '../../../../../../../node_modules/rxjs';


@Component({
  selector: 'app-family-details-edit',
  templateUrl: './family-details-edit.component.html',
  styleUrls: ['./family-details-edit.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class FamilyDetailsEditComponent implements OnInit {

  displayedColumns: string[] = ['relationship',
  'name',
  'birthdate',
  'status',
  'edit'];
  dataSource:AddEditDependentModel[];
  dependantDetails: AddEditDependentModel[];
  breadcrumbJson: any = [
    {
      label: 'Personal Details',
      link: '/personal-details'
    },
    {
      label: 'Family Details',
      link: '/personal-details/family-details'
    }
  ];
  icons: any[];
  private subscription: Subscription;

  constructor(public dialog: MatDialog,public personalDService:PersonalDetailsService) {
    this.subscription = new Subscription();
  }


  ngOnInit(): void {
    this.populateLookupdata();
    this. getEmployeeDependentService();
  }

  populateLookupdata() {
    let subLookup = this.personalDService.getLookupDataApi().subscribe((data: any) => {
      this.personalDService.setLookupdata(data);
      console.log('loookup....>', this.personalDService.getLookupdata);
    });
    this.subscription.add(subLookup);
  }
  addDependents() {
    const dialogRef = this.dialog.open(FamilyDetailsPageComponent, {
      width: '800px',
    });
  }

  getEmployeeDependentService() {
     let empDependent = this.personalDService.getEmployeeDependentServiceAPI().subscribe(
      (data: AddEditDependentModel[]) => {
        console.log('getEmployeeDependentService data...=>', data);
        this.dependantDetails = data;
        this.dataSource = data;
      },
      (error) => {
        console.error('getEmployeeDependentService error...=>', error);
      }
    );
    this.subscription.add(empDependent);
  }
  openAddDependent(edit: boolean, editObj: AddEditDependentModel) {
    const dialogRef = this.dialog.open(AddFamilyDependentModalComponent, {
      width: '683px',
    });
    dialogRef.componentInstance.edit = edit;
    if (editObj) {
      dialogRef.componentInstance.editObject = editObj;
    }
    let sub = dialogRef.afterClosed().subscribe((res) => {
      if(res=="success"){
        this.ngOnInit();
      }
    });
    this.subscription.add(sub);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
