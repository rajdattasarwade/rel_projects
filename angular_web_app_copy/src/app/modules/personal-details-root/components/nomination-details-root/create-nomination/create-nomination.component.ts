import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MessageModalService } from '../../../../../components/shared/services/message-modal-service';
import { IconsModel } from '../../../../../components/common/common-models';
import { MultiAttachPdfComponent } from '../../../../../components/shared/multi-attach-pdf/multi-attach-pdf.component';

@Component({
  selector: 'app-create-nomination',
  templateUrl: './create-nomination.component.html',
  styleUrls: ['./create-nomination.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CreateNominationComponent implements OnInit {

  breadcrumbJson: any = [
    {
      label: 'Personal Details',
      link: '/personal-details'
    },
    {
      label: 'Nomination Details',
      link: '/personal-details/nominations'
    }
  ];
  iconsMain: any;

  constructor(
    private messageModalSrv: MessageModalService,
    public dialog: MatDialog,
  ) {
    this.iconsMain = [];
    this.iconsMain.push(new IconsModel('', '', 'header-ico info_ico', 'info'));
  }

  ngOnInit(): void {
    // this.openNominationInfoPopup();
  }

  openNominationInfoPopup() {
    let message = 
      '1. If current PF and Pension nomination record already exists as “APPROVED ON EPFO PORTAL” or “Approved” – No action required.<br><br>'
      + '2. If PF and Pension nomination record does not exist, please create nomination record for PF and Pension in ESS.';
    this.messageModalSrv.showMessage(
      message,
      'Information',
      'info-icon',
      'Close'
    );
  }

  openMinorInfoPopup() {
    let message = 
      'You have selected <span class="text-underline">Minor</span> as your nominee therefore please provide details of his/her Guardian.<br><br>'
      + 'a) Guardian Name - must be a Major (age >  18 years) other than yourself<br>'
      + 'b) Relationship with Guardian<br>'
      + 'c) Address of Guardian<br>';
    this.messageModalSrv.showMessage(
      message,
      'Information',
      'info-icon',
      'Close'
    );
  }

  actionEventMain(event) {
    if (event == 'info') {
      this.dialog.open(MultiAttachPdfComponent, {
        width: '600px',
      });
    }
  }

}
