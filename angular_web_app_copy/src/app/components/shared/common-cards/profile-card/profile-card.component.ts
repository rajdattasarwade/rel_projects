import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ProfileService } from '../../user-profile/user-profile.service';
import { Config } from 'src/app/components/core/config/config';

/**
 * Shows the profile card of a employee. Example usage:
 *
 * @example
 * <app-profile-card
 *             [empDetails]="true"
 *             [empPoints]="true">
 * </app-profile-card>
 */
@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css'],
})
export class ProfileCardComponent implements OnInit {
  @Input() empDetails: boolean;
  @Input() empPoints: boolean;
  @Output() openInNewEvent = new EventEmitter<void>();
  @Output() actionEvent = new EventEmitter<void>();
  profileDet: any = [];

  constructor() {
    this.profileDet = Config.profileData;
  }

  ngOnInit(): void {}

  openInNew() {
    this.openInNewEvent.emit();
  }
  actionFun() {
    this.actionEvent.emit();
  }
}
