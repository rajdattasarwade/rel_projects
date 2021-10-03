import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MeddibuddyTabService } from '../medibuddy-tab.service';
import { of } from 'rxjs';
@Component({
  selector: 'app-specialties-filter',
  templateUrl: './specialties-filter.component.html',
  styleUrls: ['./specialties-filter.component.css']
})
export class SpecialtiesFilterComponent implements OnInit {
  getSpecialityList = [];
  selectedList = [];
  btnEnable = false;
  getSpecList = [];

  constructor(
    public dialogRef: MatDialogRef<SpecialtiesFilterComponent>,
    private medibuddyService: MeddibuddyTabService
  ) {}

  ngOnInit(): void {
    this.getSpecialityDetails();
  }
  filterValues() {
    if (this.medibuddyService.getspecHospital != undefined) {
      if (this.medibuddyService.getspecHospital.length != 0) {
        this.selectedList = this.medibuddyService.getspecHospital;
        if (this.selectedList.length == this.getSpecialityList.length) {
          this.allComplete = true;
        }

        for (let j = 0; j < this.selectedList.length; j++) {
          console.log(
            this.getSpecialityList.findIndex(
              elem => elem.name == this.selectedList[j]
            )
          );

          this.getSpecialityList[
            this.getSpecialityList.findIndex(
              elem => elem.name == this.selectedList[j]
            )
          ].check = true;
        }
      }
    }
  }
  closeModal() {
    this.medibuddyService.setspecHospital = this.getSpecList;
    this.dialogRef.close();
  }
  getSpecialityDetails() {
    this.medibuddyService.getSpecialityDetails().subscribe(
      (data: any[]) => {
        for (let i = 0; i < data.length; i++) {
          this.getSpecialityList.push({ name: data[i], check: false });
        }

        this.filterValues();
      },

      err => {
        console.log(err);
      }
    );
  }

  allComplete: boolean = false;

  updateAllComplete() {
    this.allComplete =
      this.getSpecialityList.length != 0 &&
      this.getSpecialityList.every(t => t.check);
  }

  someComplete(): boolean {
    if (this.getSpecialityList.length == 0) {
      return false;
    }
    for (let i = 0; i < this.getSpecialityList.length; i++) {
      if (this.getSpecialityList[i].check) {
        this.btnEnable = true;
        return;
      } else {
        this.btnEnable = false;
      }
    }
    return (
      this.getSpecialityList.filter(t => t.check).length > 0 &&
      !this.allComplete
    );
  }

  setAll(completed: boolean) {
    if (completed) {
      this.btnEnable = true;
    } else {
      this.btnEnable = false;
    }
    this.allComplete = completed;
    if (this.getSpecialityList.length == 0) {
      return;
    }
    this.getSpecialityList.forEach(t => (t.check = completed));
  }
  onApply() {
    for (let i = 0; i < this.getSpecialityList.length; i++) {
      if (this.getSpecialityList[i].check) {
        this.getSpecList.push(this.getSpecialityList[i].name);
      }
    }
    this.closeModal();
  }
}
