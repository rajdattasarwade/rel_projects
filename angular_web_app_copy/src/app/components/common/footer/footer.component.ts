import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BottomSheetComponent } from '../bottom-sheet/bottom-sheet.component';
import {
  faHome,
  faInbox,
  faPlus,
  faBell,
  faHamburger,
} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  constructor(private _bottomSheet: MatBottomSheet) {}
  public footerItems = [
    {
      text: 'Home',
      icon: faHome,
      clickHandler: this.onHomeClick,
    },
    {
      text: 'Inbox',
      icon: faInbox,
      clickHandler: this.onInboxClick,
    },
    {
      text: '',
      icon: faPlus,
      clickHandler: this.openBottomSheet,
    },
    {
      text: 'Notification',
      icon: faBell,
      clickHandler: this.onNotificationClick,
    },
    {
      text: 'Other',
      icon: faHamburger,
      clickHandler: this.onOtherClick,
    },
  ];
  ngOnInit(): void {}

  onHomeClick(): void {
    console.log('home click');
    this.openBottomSheet();
  }
  onInboxClick(): void {
    this._bottomSheet.open(BottomSheetComponent);
  }
  onNotificationClick(): void {}
  onOtherClick(): void {}
  onAddClick(): void {}
  openBottomSheet(): void {
    this._bottomSheet.open(BottomSheetComponent);
  }
}
