import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { SpecialtiesFilterComponent } from '../specialties-filter/specialties-filter.component';
import { HospitalsDetailModalComponent } from '../hospitals-detail-modal/hospitals-detail-modal.component';
import { MeddibuddyTabService } from '../medibuddy-tab.service';
import { state } from '@angular/animations';

@Component({
  selector: 'app-hospitals-list-popup',
  templateUrl: './hospitals-list-popup.component.html',
  styleUrls: ['./hospitals-list-popup.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HospitalsListPopupComponent implements OnInit {
  stateList = [];
  cityList = [];
  getSpecialityList: any[];
  selectedState: any;
  insuranceCmpnyName: any;
  selectedCity: any;
  datanotfound: boolean = true;
  orgHospitalListData: any;
  hospitalListData: any;
  searchText: any;
  finalList = [];
  filterornot = false;
  show: boolean = false;
  finalFilterList = [];
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<HospitalsListPopupComponent>,
    private medibuddyService: MeddibuddyTabService
  ) {}
  hspList;
  ngOnInit(): void {
    this.getState();
    this.getSpecialityDetails();
  }

  specialtiesFilter() {
    const dialogRef = this.dialog
      .open(SpecialtiesFilterComponent, {
        width: '700px'
      })
      .afterClosed()
      .subscribe(() => {
        this.hspList = this.medibuddyService.getspecHospital;
        this.finalList = [];

        if (this.hspList.length != 0) {
          this.filterornot = true;
          for (let i = 0; i < this.hospitalListData.length; i++) {
            if (this.hospitalListData[i].hospSpecialities.length != 0) {
              for (
                let j = 0;
                j < this.hospitalListData[i].hospSpecialities.length;
                j++
              ) {
                for (let k = 0; k < this.hspList.length; k++) {
                  if (
                    this.hospitalListData[i].hospSpecialities[j].includes(
                      this.hspList[k]
                    )
                  ) {
                    this.finalList.push(this.hospitalListData[i]);
                  }
                }
              }
            }
          }
          this.finalFilterList = this.finalList;
          this.orgHospitalListData = this.finalList;
        } else {
          this.filterornot = false;
          this.orgHospitalListData = this.hospitalListData;
        }
      });
  }

  closeModal() {
    this.dialogRef.close();
  }
  hospitalDetails(i) {
    this.medibuddyService.setHospitalDetail = i;
    const dialogRef = this.dialog.open(HospitalsDetailModalComponent, {
      width: '700px'
    });
  }
  getState() {
    this.medibuddyService.getStatDetails().subscribe(
      (data: any[]) => {
        this.stateList = data;
        this.stateList.sort();
        // this.getCity();
      },
      err => {
        console.log(err);
      }
    );
  }
  searchHsp() {
    if (this.hospitalListData.length == null) {
      return;
    }
    if (this.searchText != null) {
      if (this.filterornot) {
        this.finalList = [];
        for (let i = 0; i < this.finalFilterList.length; i++) {
          if (
            this.finalFilterList[i].address
              .toLowerCase()
              .includes(this.searchText.toLowerCase()) ||
            this.finalFilterList[i].name
              .toLowerCase()
              .includes(this.searchText.toLowerCase())
          ) {
            this.finalList.push(this.finalFilterList[i]);
          }
        }
      } else {
        this.finalList = [];
        for (let i = 0; i < this.hospitalListData.length; i++) {
          if (
            this.hospitalListData[i].address
              .toLowerCase()
              .includes(this.searchText.toLowerCase()) ||
            this.hospitalListData[i].name
              .toLowerCase()
              .includes(this.searchText.toLowerCase())
          ) {
            this.finalList.push(this.hospitalListData[i]);
          }
        }
      }
    }
    this.orgHospitalListData = this.finalList;
  }
  getCity() {
    this.datanotfound = true;
    this.cityList = [];
    this.medibuddyService.getCityDetails(this.selectedState).subscribe(
      (data: any[]) => {
        this.cityList = data;
        this.cityList.sort();
      },
      err => {
        console.log(err);
      }
    );
  }
  getSpecialityDetails() {
    this.medibuddyService.getSpecialityDetails().subscribe(
      (data: any[]) => {
        this.getSpecialityList = data;
      },
      err => {
        console.log(err);
      }
    );
  }
  getStateCityWiseHospitalList() {
    this.showSearchFilter();
    let hspList = this.medibuddyService.getInsuranceName;
    this.medibuddyService
      .searchHospitaList(this.selectedState, this.selectedCity, hspList)
      .subscribe(
        (data: any) => {
          if (data.length > 0) {
            this.datanotfound = true;
            this.orgHospitalListData = data;
            this.hospitalListData = this.orgHospitalListData;
          } else {
            this.hospitalListData = this.orgHospitalListData = [];
            this.datanotfound = false;
          }
        },
        err => {
          // console.log(err);
        }
      );
  }
  showSearchFilter() {
    this.show = true;
  }
}
