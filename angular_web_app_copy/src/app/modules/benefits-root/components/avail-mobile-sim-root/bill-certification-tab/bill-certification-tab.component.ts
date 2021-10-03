import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bill-certification-tab',
  templateUrl: './bill-certification-tab.component.html',
  styleUrls: ['./bill-certification-tab.component.css']
})
export class BillCertificationTabComponent implements OnInit {
  displayedColumns: any = ['mobilenumber', 'fromdate', 'todate', 'personaltotal','officialtotal', 'grandtotal'];
  dataSource = [
    {mobilenumber:'1234567890', fromdate: '31/03/20', todate: '30/04/20', personaltotal: '300',officialtotal : '200', grandtotal : '500', status : ''},
    {mobilenumber:'', fromdate: '', todate: '', personaltotal: '',officialtotal : '', grandtotal : '', status : ''},
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
