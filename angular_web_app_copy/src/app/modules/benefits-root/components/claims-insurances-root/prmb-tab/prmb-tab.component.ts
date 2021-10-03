import {
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { MessageModalService } from 'src/app/components/shared/services/message-modal-service';
import { BenefitsService } from '../../../services/benefits.service';
import { PrmbAddDependentModalComponent } from './prmb-add-dependent-modal/prmb-add-dependent-modal.component';
import { DependentDetailModel, PrmbEligibilityModel } from './prmb.model';
import { PrmbService } from './prmb.service';

@Component({
  selector: 'app-prmb-tab',
  templateUrl: './prmb-tab.component.html',
  styleUrls: ['./prmb-tab.component.css'],
})
export class PrmbTabComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  @Input() prmbElibibilityDetailObj: PrmbEligibilityModel = null;
  displayedColumns: any = [
    'dependentRelation',
    'dependentName',
    'depDisab',
    'action',
  ];
  dataSource: any;
  dependentDetailObj: DependentDetailModel = null;
  dependentDetailList: DependentDetailModel[] = [];
  ELEMENT_DATA: DependentDetailModel[] = [];
  preferredAddress: string = '';
  printEnabled: boolean = false;
  constructor(
    public activeModal: MatDialog,
    private rootService: BenefitsService,
    public dialogRef: MatDialogRef<PrmbAddDependentModalComponent>,
    private messageModalService: MessageModalService,
    private prmbService: PrmbService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.subscription = new Subscription();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngOnInit(): void {
    console.log('prmbElibibilityDetailObj...=>', this.prmbElibibilityDetailObj);
    this.getDependentDetails();
    this.dataSource = new MatTableDataSource<DependentDetailModel>(
      this.ELEMENT_DATA
    );
    console.log('00 datasource...', this.dataSource);
    console.log('00 element...', this.ELEMENT_DATA);
  }

  addDependentModal() {
    const dialogRef = this.activeModal.open(PrmbAddDependentModalComponent, {
      width: '683px',
    });
    dialogRef.afterClosed().subscribe((x) => {
      this.ELEMENT_DATA = this.prmbService.prmbElements;
      console.log('after close popup', this.ELEMENT_DATA);
      console.log('datasource...', this.dataSource);
      console.log('element...', this.ELEMENT_DATA);
      this.detechChange();
    });
  }
  getDependentDetailsElements() {
    let sub = this.prmbService.prmbElementsSubject.subscribe((data) => {
      this.ELEMENT_DATA = data;
      console.log('ELEMET_DATA=>', this.ELEMENT_DATA);
      console.log('01 datasource...', this.dataSource);
      console.log('01 element...', this.ELEMENT_DATA);
      this.detechChange();
    });
    this.subscription.add(sub);
  }
  getDependentDetails() {
    var sub = this.rootService.getPrmbDependentDetailsApi().subscribe(
      (data: DependentDetailModel[]) => {
        console.log('getPrmbDetails... ', data);
        this.dependentDetailList = data;
        this.prmbService.prmbDependentDetails = data;
        this.preferredAddress = this.dependentDetailList[0].address;
        this.calculateDependentCount();
        if (this.dependentDetailList[0].exFlag == 'X') {
          this.prmbService.setInitialDataSource(true);
          this.printEnabled = true;
        }
        this.prmbService.setInitialDataSource(false);
        this.getDependentDetailsElements();
      },
      (error) => {
        console.error('Error in getDependentDetailsApi...', error);
        this.showErrorMessageOk('Prmb Service is not available currently.');
      }
    );
    this.subscription.add(sub);
  }
  showErrorMessageOk(message) {
    this.messageModalService.showMessage(
      message,
      'Error',
      'warning-icon',
      'OK'
    );
  }
  childCount: number = 0;
  spouseCount: number = 0;
  calculateDependentCount() {
    this.dependentDetailList.forEach((x) => {
      if (x.dependentType == '1') {
        this.spouseCount++;
      } else {
        this.childCount++;
      }
    });
    this.prmbService.childCount = this.childCount;
    this.prmbService.spouseCount = this.spouseCount;
  }

  deleteRow(item: DependentDetailModel) {
    console.log('deleteRow...', item);
    this.prmbService.removeElement(item);
  }

  onSubmit() {
    console.log('onsubmit....');
  }
  onPrint() {
    console.log('onPrint....');
  }
  detechChange() {
    this.changeDetectorRef.detectChanges();
  }
}
