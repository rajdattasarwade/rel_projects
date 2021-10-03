import {
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
  ɵConsole,
} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MeddibuddyTabService } from '../../claims-insurances-root/medibuddy-tab/medibuddy-tab.service';
import { PmeService } from '../../claims-insurances-root/pme-tab/pme.service';
import { AddressInfoModalComponent } from '../address-info-modal/address-info-modal.component';

@Component({
  selector: 'app-medical-centers-info-modal',
  templateUrl: './medical-centers-info-modal.component.html',
  styleUrls: ['./medical-centers-info-modal.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class MedicalCentersInfoModalComponent implements OnInit {
  @Input() title;
  @Input() address;
  teamDataString: string[] = [];
  constructor(
    private dialog: MatDialogRef<AddressInfoModalComponent>,
    private pmeService: PmeService
  ) {}

  ngOnInit(): void {
    for (let each of this.address) this.teamDataString.push(each['address']);
    console.log(this.teamDataString);
  }
  medicalCenters() {
    this.dialog.close();
    this.pmeService.getCentresHospital('ALL', 'ALL').subscribe(
      (res: Blob) => {
        if (res) {
          let file = new Blob([res], { type: 'application/pdf' });
          var pdfUrl = URL.createObjectURL(file);
          window.open(pdfUrl);
        }
      },
      (error) => {}
    );
  }
}
