import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IconsModel } from 'src/app/components/common/common-models';

@Component({
  selector: 'app-important-date-root',
  templateUrl: './important-date-root.component.html',
  styleUrls: ['./important-date-root.component.css']
})
export class ImportantDateRootComponent implements OnInit {

  iconsMain: any;
  constructor(
    private router: Router,
  ) {
    this.iconsMain = [];
    this.iconsMain.push(new IconsModel('', 'Edit', 'ico-extra-small edit-white-ico', 'edit'));
  }

  ngOnInit(): void {
  }

  actionEventMain(event) {
    if (event == 'edit') {
      this.router.navigate(['/personal-details/important-dates']);
    }
  }

}
