import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmationSimModalComponent } from './confirmation-sim-modal/confirmation-sim-modal.component';
import { MobileNumberPortabilityComponent } from './mobile-number-portability/mobile-number-portability.component';
import { ValueAddedServiceModalComponent } from './value-added-service-modal/value-added-service-modal.component';
import { DiscontinueSimModalComponent } from './discontinue-sim-modal/discontinue-sim-modal.component';
import { AvailMobileSimService } from '../avail-mobile-sim.service';
import { OverviewModel } from '../avail-mobile-sim.model';
import { MatTableDataSource } from '@angular/material/table';
import { PdfViewerModalComponent } from 'src/app/components/shared/pdf-viewer-modal/pdf-viewer-modal.component';
import { MessageModalService } from 'src/app/components/shared/services/message-modal-service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-avail-overview-tab',
  templateUrl: './avail-overview-tab.component.html',
  styleUrls: ['./avail-overview-tab.component.css']
})
export class AvailOverviewTabComponent implements OnInit, OnDestroy {
  displayedColumns: any = ['requestdate', 'mobilenumber', 'status', 'type','requestno', 'action'];
  dataSource;
  applyStatus: string = '';
  subscriptionList: Subscription[] = [];
  constructor(private router : Router, public activeModal: MatDialog, public dialogRef: MatDialogRef<ConfirmationSimModalComponent>,
    public dialogRef1: MatDialogRef<MobileNumberPortabilityComponent>, private availMobileSimService: AvailMobileSimService, private messageModalService: MessageModalService) {
      this.dataSource = new MatTableDataSource<OverviewModel>([]);
     }

  ngOnInit(): void {
    this.getOverviewDetails();
  }
  
  routeToIsd(){
    this.router.navigate(['/benefits/isd-calling']);
  }
  routeToIrs(){
    this.router.navigate(['/benefits/international-roaming-services']);
  }
  openConfirmSim(): void {
    if(this.applyStatus) {
      this.messageModalService.showMessage(
        this.applyStatus,
        'Error',
        'warning-icon',
        "CLOSE"
      );
     return;
    } 
    const dialogRef = this.activeModal.open(ConfirmationSimModalComponent, {
      width: '452px',
    });
    dialogRef.afterClosed().subscribe(value => {
      if(value){
        this.getOverviewDetails();
      }
    })
  }
  openMobilePortability(element: OverviewModel) {
    const dialogRef1 = this.activeModal.open(MobileNumberPortabilityComponent, {
      width: '452px',
    });
    dialogRef1.componentInstance.serialNo = element.serialNo;
    dialogRef1.afterClosed().subscribe(value => {
      if(value){
        this.getOverviewDetails();
      }
    })
  }
  openValueAddedModal(element: OverviewModel) {
    const dialogRef2 = this.activeModal.open(ValueAddedServiceModalComponent, {
      width: '452px',
    });
    dialogRef2.componentInstance.serialNo = element.serialNo;
  }
  discontinueSim(element: OverviewModel) {
    let msg = 'Be Cautious. Availing Duplicate/Retain/Surrender SIM may discontinue services for current SIM card and stop payments on this mobile number.'
    this.messageModalService.showMessage(
      msg,
      'Error',
      'warning-icon',
        'OK',
        (reason: string) => {
          const dialogRef3 = this.activeModal.open(DiscontinueSimModalComponent, {
            width: '452px',
          });
          dialogRef3.componentInstance.serialNo = element.serialNo;
          dialogRef3.afterClosed().subscribe(value => {
            if(value){
              this.getOverviewDetails();
            }
          })
        }
    );
  }

  getOverviewDetails(): void {
    this.subscriptionList.push(
      this.availMobileSimService.getOverviewConnectionList().subscribe((data: OverviewModel[]) =>{
        if(data.length > 0){
          this.applyStatus = data[0].flagCreateStatus;
          this.dataSource = new MatTableDataSource<OverviewModel>(data);
        }else{
          this.applyStatus = '';
          this.dataSource = new MatTableDataSource<OverviewModel>([]);
        }
      })
    );
  }
  getDateFormat(date: string): string {
    return date.split('/').join('.');
  }
  openAttachment(element: OverviewModel): void {
    this.subscriptionList.push(
      this.availMobileSimService.getViewAttachment(element.serialNo).subscribe((data: any) => {
        let file = new Blob([data],{type: 'application/pdf'});
        let pdfUrl = URL.createObjectURL(file);
        const dialogRef = this.activeModal.open(PdfViewerModalComponent);
        dialogRef.componentInstance.pdfUrl = pdfUrl;
        dialogRef.componentInstance.title = element.connectionStatus;
        dialogRef.componentInstance.pdfName = element.connectionStatus;
      },
      error => {
        let msg =
            "Sorry for the inconvenience. Please try again after some time";
          this.messageModalService.showMessage(msg,
            'Error',
            'warning-icon',
            'CLOSE'
            );
      })
    );
  }
  deleteRecord(element: OverviewModel): void {
    this.messageModalService.showConfirmation(
      "Do you want to delete your request?",
      'Confirmation',
      'confirmation-icon',
      (reason: string) => {
        if (reason === 'YES') {
          this.subscriptionList.push(
            this.availMobileSimService.postDeleteRequest(element.serialNo).subscribe(
              data => {
                this.messageModalService.showMessage(
                  "Request deleted successfuly.",
                  "success",
                  "success-icon"
                );
                this.getOverviewDetails();
              },
              error => {
                this.messageModalService.showMessage(
                  'Sorry for the inconvenience.Please try again.',
                  'Error',
                  'warning-icon',
                  'CLOSE'
                );
              })
          );
        }
      }
    );
  }
  ngOnDestroy(): void {
    if(this.subscriptionList.length > 0){
      this.subscriptionList.forEach(subs => {
        subs.unsubscribe();
      })
    }
  }
}
