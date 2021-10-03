import {
  Component,
  OnInit,
  Input,
  ViewEncapsulation,
  Output,
  EventEmitter
} from '@angular/core';
import { Router } from '@angular/router';
/**
 * Shows an action card. UI:
 *
 * ![Screenshot-1](/screenshots/action_card1.png)
 *
 * ![Screenshot-2](/screenshots/action_card2.png)
 * @example
 * <app-profile-card
 *             [empDetails]="true"
 *             [empPoints]="true">
 * </app-profile-card>
 *
 */
@Component({
  selector: 'app-action-card',
  templateUrl: './action-card.component.html',
  styleUrls: ['./action-card.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ActionCardComponent implements OnInit {
  showIcon: boolean = false;
  imgDefault = 'down-arrow-ico';
  @Input() headerText: any;
  @Input() icon: any;
  @Input() contentHead: any;
  @Input() contentSub: any;
  @Input() bgcolor: any;
  @Input() class: any;
  @Input() routerUrl: any;
  @Input() imgUrl: any;
  @Input() showHide: boolean = false;
  @Output() actionEvent = new EventEmitter<void>();
  @Output() toggleEvent = new EventEmitter<void>();
  @Input() subHeaderText: any;
  @Input() cardsDetails: any;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  routeTo() {
    if (this.routerUrl && this.routerUrl != '') {
      this.router.navigate([this.routerUrl]);
    } else {
      this.actionEvent.emit();
    }
  }
  toggleList() {
    this.showIcon = !this.showIcon;
    if (this.showIcon) {
      this.imgDefault = 'up-arrow-ico';
      this.toggleEvent.emit();
    } else {
      this.imgDefault = 'down-arrow-ico';
      this.toggleEvent.emit();
    }
  }
}
