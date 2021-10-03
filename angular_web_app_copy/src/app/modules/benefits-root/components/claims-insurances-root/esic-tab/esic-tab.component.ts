import { Component, OnDestroy, ViewEncapsulation, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessageModalService } from 'src/app/components/shared/services/message-modal-service';
import { BenefitsService } from 'src/app/modules/benefits-root/services/benefits.service';
import { EsicDetailModel } from './esic.model';

@Component({
  selector: 'app-esic-tab',
  templateUrl: './esic-tab.component.html',
  styleUrls: ['./esic-tab.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class EsicTabComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  fileToDownloadUrl: any;
  file: any;
  fileName: string;
  esicDetailObj: EsicDetailModel = null;
  constructor(
    private rootService: BenefitsService,
    private messageModalService: MessageModalService
  ) {
    this.subscription = new Subscription();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngOnInit(): void {
    this.getEsicDetail();
  }
  getDocument(epancard: boolean) {
    if (epancard) {
      this.getDoc(this.esicDetailObj.pehchanCardId);
    } else {
      this.getDoc(this.esicDetailObj.medicalCardId);
    }
  }
  getEsicDetail() {
    var sub = this.rootService.getEsicDetailAPI().subscribe(
      (data: EsicDetailModel) => {
        console.log('esic...', data);
        this.esicDetailObj = data;
      },
      (error) => {
        console.log('Error in getEsicDetail..', error);
        this.showErrorMessageOk('ESIC Service is currently unavailable.');
      }
    );
    this.subscription.add(sub);
  }
  getDoc(docId) {
    var sub = this.rootService.getDocument(docId).subscribe(
      (data: any) => {
        if (data) {
          console.log('pdf');
          console.log(data);
          this.file = new Blob([data], { type: 'application/pdf' });
          this.fileToDownloadUrl = URL.createObjectURL(this.file);
          console.log(this.file);
          console.log(this.fileToDownloadUrl);
          this.fileName = this.file.name;
          this.openPdfInNewTab();
        } else {
          this.showErrorMessageOk('Document not available.');
        }
      },
      (error) => {
        console.error('Error in getEpancard...', error);
        this.showErrorMessageOk('Document not available currently.');
      }
    );
    this.subscription.add(sub);
  }
  openPdfInNewTab() {
    console.log('fileName=>', this.fileName);
    window.open(this.fileToDownloadUrl, this.fileName);
  }
  showErrorMessageOk(message) {
    this.messageModalService.showMessage(
      message,
      'Error',
      'warning-icon',
      'OK'
    );
  }
}
