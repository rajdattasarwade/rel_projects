import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-pdf-zoom',
  templateUrl: './pdf-zoom.component.html',
  styleUrls: ['./pdf-zoom.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class PdfZoomComponent implements OnInit {

  @Input() fileUrl: any;

  constructor() { }

  ngOnInit(): void {
  }
  viewFile() {
      window.open(this.fileUrl); 
  }
}
