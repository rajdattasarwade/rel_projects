import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MeddibuddyTabService } from '../medibuddy-tab.service';
@Component({
  selector: 'app-hospitals-detail-modal',
  templateUrl: './hospitals-detail-modal.component.html',
  styleUrls: ['./hospitals-detail-modal.component.css']
})
export class HospitalsDetailModalComponent implements OnInit {
  detailList: any;
  constructor(
    public dialogRef: MatDialogRef<HospitalsDetailModalComponent>,
    private medibuddyService: MeddibuddyTabService
  ) {}

  ngOnInit(): void {
    this.detailList = this.medibuddyService.getHospitalDetail;
  }

  closeModal() {
    this.dialogRef.close();
  }
}
