import { Component, OnInit } from '@angular/core';
import { VehicleRegService } from './vehicle_registration.service';

declare var jsCallbacks: any;

@Component({
  selector: 'app-fuel-reimbursement',
  templateUrl: './fuel-reimbursement.component.html',
  providers: [VehicleRegService],
})
export class FuelReimbursementComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
