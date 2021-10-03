import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { GratuityService } from '../../gratuity.service';
import { GratuityPdfViewerComponent } from '../gratuity-pdf-viewer/gratuity-pdf-viewer.component';
import * as moment from 'moment';
import { MyRetiralsService } from '../../my-retirals.service';
import { MessageModalService } from 'src/app/components/shared/services/message-modal-service';

@Component({
  selector: 'app-gratuity-encashment-declaration',
  templateUrl: './gratuity-encashment-declaration.component.html',
  styleUrls: ['./gratuity-encashment-declaration.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GratuityEncashmentDeclarationComponent implements OnInit {

  public subscriptionsList: Subscription[] = [];
  displayedColumns: any = ['prev_employer','from_date','to_date','gratuity_amt','encashment_amt'];
  dataSource = [];

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<GratuityEncashmentDeclarationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public gratuityService: GratuityService,
    public myRetiralsService: MyRetiralsService,
    private messageService:MessageModalService

  ) { }

  ngOnInit(): void {
    this.getDeclarationList()
  }

  
  ngOnDestroy() {
    if (this.subscriptionsList.length > 0) {
      this.subscriptionsList.forEach(element => {
        element.unsubscribe()
      })
    }
  }

  closeModal() {
    this.dialogRef.close();
  }

  openGratuityPdfViewer(pdfUrl) {
    const dialogRef = this.dialog.open(GratuityPdfViewerComponent, {
      width: '683px',
      data: {
        pdfUrl: pdfUrl,
        declarationList: this.dataSource
      }
    });
    
    this.subscriptionsList.push(dialogRef.afterClosed().subscribe((res)=>{
      if(res){
      this.closeModal()
      }
    }))

  }

  getDeclarationList(){
    this.subscriptionsList.push(this.gratuityService.getDeclaration('E').subscribe(
      (data: any)=>{
        if(data.length>0){
          this.dataSource = data
          this.dataSource.forEach((element: any)=>{
            element.fromDate = element.fromDate ? moment(element.fromDate).format('DD-MM-YYYY'):null
            element.toDate = element.toDate ? moment(element.toDate).format('DD-MM-YYYY'):null
          })
        }
      }
    ))
  }

  saveDeclaration(){
    let payload = this.gratuityService.createPayload(this.dataSource,'P')
    this.subscriptionsList.push(this.gratuityService.saveGratuityDeclaratiom(payload).subscribe(
      (data: any)=>{
        if (data.responseStatus == 'SUCCESS'){
          let responseData = JSON.parse(data.responseData)
          if (responseData) {
            let pdfStream = responseData.d.PDFStream
            if(pdfStream){
              this.getPDF(pdfStream)
            }        
          }
        }else {
          let errorMsg =data.systemErrMsg?data.systemErrMsg:''
          this.messageService.showMessage(
            errorMsg,
            'Error',
            'warning-icon',
            'CLOSE'
          );
          this.dialogRef.close();
        }
      }
    ))

  }

  getPDF(pdfStream){
    this.subscriptionsList.push(this.gratuityService.getGratuityPDF(pdfStream).subscribe(
      (data: any)=>{
        if(data){
          let file = new Blob([data],{type: 'application/pdf'});
          let pdfUrl = URL.createObjectURL(file);
          this.openGratuityPdfViewer(pdfUrl)
        }
      }
    ))
  }

}
