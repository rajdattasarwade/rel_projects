import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { MessageModalService } from 'src/app/components/shared/services/message-modal-service';
import { AvailMobileSimService } from '../../avail-mobile-sim.service';

@Component({
  selector: 'app-value-added-service-modal',
  templateUrl: './value-added-service-modal.component.html',
  styleUrls: ['./value-added-service-modal.component.css']
})
export class ValueAddedServiceModalComponent implements OnInit, OnDestroy {
  serialNo: string;
  valueAddedList: any;
  subscription: Subscription;
  constructor(private availMobileSimService: AvailMobileSimService, private messageModalService: MessageModalService, public dialogRef: MatDialogRef<ValueAddedServiceModalComponent>) { }

  ngOnInit(): void {
    this.subscription = this.availMobileSimService.getAddService(this.serialNo).subscribe((data: any) => {
      this.valueAddedList = data;
      },
      error => console.log(error)
    );
  }
  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
}
