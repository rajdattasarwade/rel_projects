import { Component, OnInit, ViewEncapsulation } from '@angular/core';
@Component({
  selector: 'app-reimbursements',
  templateUrl: './reimbursements.component.html',
  styleUrls: ['./reimbursements.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ReimbursementsComponent implements OnInit {
  statusText: string = 'All';


  constructor() { }

  ngOnInit(): void {
   
  }



}
