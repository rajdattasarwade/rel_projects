import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PolicyService } from '../policy.service';
import { PdfViewerModalComponent } from '../../../pdf-viewer-modal/pdf-viewer-modal.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-policy-search-list',
  templateUrl: './policy-search-list.component.html',
  styleUrls: ['./policy-search-list.component.css'],
})
export class PolicySearchListComponent implements OnInit {
  searchTerm: string;
  searchResults: any[] = [];
  subscription: Subscription[] = [];
  constructor(
    private policyService: PolicyService,
    public activeModal: MatDialog
  ) {}

  ngOnInit(): void {
    this.searchTerm = this.policyService.searchTerm;
    this.searchResults = this.policyService.searchResults;
  }
  generatePDF(documentNo: string, documentName: string) {
    this.subscription.push(
      this.policyService.generatePDFService(documentNo).subscribe(
        (data) => {
          let file = new Blob([data], { type: 'application/pdf' });
          const pdfUrl = URL.createObjectURL(file);
          // jsCallbacks.openUrlInBrowser(pdfUrl);
          const dialogRef = this.activeModal.open(PdfViewerModalComponent);
          dialogRef.componentInstance.pdfUrl = pdfUrl;
          dialogRef.componentInstance.title = documentName;
          dialogRef.componentInstance.pdfName = documentName;
        },
        (error) => {
          console.log('error', error);
        }
      )
    );
  }
  ngDoCheck() {
    this.searchTerm = this.policyService.searchTerm;
    this.searchResults = this.policyService.searchResults;
  }
  ngOnDestroy() {
    if (this.subscription.length > 0)
      this.subscription.forEach((s) => s.unsubscribe());
  }
}
