import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BenefitsService } from '../../../services/benefits.service';
import { MaternityInfoModalComponent } from '../maternity-info-modal/maternity-info-modal.component';

import { PaternityInfoModalComponent } from '../paternity-info-modal/paternity-info-modal.component';

@Component({
  selector: 'app-maternity-paternity-landing',
  templateUrl: './maternity-paternity-landing.component.html',
  styleUrls: ['./maternity-paternity-landing.component.css'],
})
export class MaternityPaternityLandingComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private BenefitsService: BenefitsService
  ) {}
  selectedOption: string = '';
  ngOnInit(): void {}

  maternityPaternityInfo() {
    this.dialog.closeAll();
    this.BenefitsService.selectedOption = this.selectedOption;
    const dialogRef =
      this.selectedOption == 'Maternity'
        ? this.dialog.open(MaternityInfoModalComponent, {
            width: '800px',
          })
        : this.dialog.open(PaternityInfoModalComponent, {
            width: '800px',
          });
  }
}
