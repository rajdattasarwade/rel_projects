import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-download-details',
  templateUrl: './download-details.component.html',
  styleUrls: ['./download-details.component.css']
})
export class DownloadDetailsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onDownloadZ5(){
    window.open("/sap/opu/odata/sap/ZHR_Z5_POSITION_DETAILS_SRV/Z5DownloadSet(Z5='')/$value");
  }

  onDownloadJD(){
    window.open("/sap/opu/odata/sap/ZHR_Z5_POSITION_DETAILS_SRV/JDDownloadSet(Z5='')/$value");
  }

  onDownloadPosition(){
    window.open("/sap/opu/odata/sap/ZHR_Z5_POSITION_DETAILS_SRV/PositionDownloadSet(POS='')/$value");
  }
}
