import {
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewContainerRef,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MessageModalService } from 'src/app/components/shared/services/message-modal-service';

@Component({
  selector: 'app-claims-list',
  templateUrl: './claims-list.component.html',
  styleUrls: ['./claims-list.component.css'],
})
export class ClaimsListComponent implements OnInit {
  @Input() reimbursementObj: any;
  @Output() successFlag = new EventEmitter();

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private componentFactoryResolver: ComponentFactoryResolver,
    public vcr: ViewContainerRef,
    public messageModalSrv: MessageModalService
  ) {}

  ngOnInit(): void {}

  openPopup(list) {
    // const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentName);
    // const componentRef = this.vcr.createComponent(ComponentFactory: componentFactory<componentName>)
    console.log(list.type);
    let width: string = '';
    if (
      list.type.reimbursementType.sapCode == 'ZAMR' ||
      list.type.reimbursementType.sapCode == 'ZREP' ||
      list.type.reimbursementType.sapCode == 'ZUSR' ||
      list.type.reimbursementType.sapCode == 'ZATR'
    ) {
      let callBackFun: any;
      this.messageModalSrv.showMessage(
        'Eligible expenses as per policy conditions and limits are required to be claimed together only once in a financial year',
        'info',
        'info-icon',
        'OK',
        (callBackFun = () => {
          let width = '683px';
          this.callPopup(list, width);
        })
      );
    } else if (list.type.reimbursementType.sapCode == 'ZCNV') {
      let callBackFun: any;
      this.messageModalSrv.showMessage(
        'Local conveyance including toll charges if any, within Municipal Limits (Upto 100 Kms). Please attach log sheet if travelled by own vehicle.',
        'info',
        'info-icon',
        'OK',
        (callBackFun = () => {
          let width = '683px';
          this.callPopup(list, width);
        })
      );
    } else {
      if (list.type.reimbursementType.sapCode == 'SLTA') {
        width = '1055px';
      } else {
        width = '683px';
      }
      this.callPopup(list, width);
    }
  }

  callPopup(list, width) {
    const dialogRef = this.dialog.open(list.selectedRembType.componentName, {
      width: width,
      data: {
        typeDetails: list.type,
        payLoad: { viewMode: false, setOperation: '' },
      },
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'success') {
        this.successFlag.emit(true);
      }
    });
  }
}
