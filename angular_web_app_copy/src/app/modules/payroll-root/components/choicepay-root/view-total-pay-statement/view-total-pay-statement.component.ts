import { Component, OnInit } from '@angular/core';
import { ChoicepayRootService } from '../choicepay-root.service';

@Component({
  selector: 'app-view-total-pay-statement',
  templateUrl: './view-total-pay-statement.component.html',
  styleUrls: ['./view-total-pay-statement.component.css'],
})
export class ViewTotalPayStatementComponent implements OnInit {
  constructor(private service: ChoicepayRootService) {}

  ngOnInit(): void {}
  actionEvent() {
    console.log(".....")
    this.service.choicepayNavigateTo(['/payroll/total-pay-statement']);
  }
}
