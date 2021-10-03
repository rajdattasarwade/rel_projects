import {
  Component,
  OnInit,
  ViewEncapsulation,
  Inject,
  Input,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-profile-search-popup',
  templateUrl: './profile-search-popup.component.html',
  styleUrls: ['./profile-search-popup.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ProfileSearchPopupComponent implements OnInit {
  alteredDataSource: any;
  constructor(
    public dialogRef: MatDialogRef<ProfileSearchPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.alterData();
  }

  alterData() {
    let keys = Object.keys(this.data);
    let values = Object.values(this.data);
    this.alteredDataSource = {
      picUrl: values[0],
      dialogTitle: values[1],
      data: [],
    };
    for (let i = 2; i < keys.length; i++) {
      let dataObj = {
        key: keys[i],
        value: values[i],
      };
      this.alteredDataSource.data.push(dataObj);
    }
  }

  closeModal() {
    this.dialogRef.close();
  }
}
