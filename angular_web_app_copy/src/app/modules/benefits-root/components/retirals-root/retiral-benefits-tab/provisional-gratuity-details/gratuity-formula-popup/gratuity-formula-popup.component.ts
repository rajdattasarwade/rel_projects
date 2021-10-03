import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RetiralsService } from '../../retirals.service';
import { Subscription } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-gratuity-formula-popup',
  templateUrl: './gratuity-formula-popup.component.html',
  styleUrls: ['./gratuity-formula-popup.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GratuityFormulaPopupComponent implements OnInit {
  public subscriptionsList: Subscription[] = [];

  constructor(
    public dialogRef: MatDialogRef<GratuityFormulaPopupComponent>,private retiralsService:RetiralsService,@Inject(MAT_DIALOG_DATA) public gratuityData: any
  ) { }

  ngOnInit(): void {
    
  }

  closeModal() {
    this.dialogRef.close();
  }

}
