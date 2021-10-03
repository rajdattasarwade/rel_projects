import { Component, OnInit } from '@angular/core';
import { LearningService } from '../../learning.service';

@Component({
  selector: 'app-reedem',
  templateUrl: './reedem.component.html',
  styleUrls: ['./reedem.component.css'],
})
export class ReedemComponent implements OnInit {
  constructor(private service: LearningService) {}

  ngOnInit(): void {}

  goBack() {
    this.service.goBackToHome();
  }
}
