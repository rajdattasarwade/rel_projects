import { Component, OnInit } from '@angular/core';
import { IconsModel } from 'src/app/components/common/common-models';

@Component({
  selector: 'app-personal-information-root',
  templateUrl: './personal-information-root.component.html',
  styleUrls: ['./personal-information-root.component.css']
})
export class PersonalInformationRootComponent implements OnInit {

  iconsMain: any;
  constructor() { 
    this.iconsMain = [];
    this.iconsMain.push(new IconsModel('', '', 'header-ico info_ico', 'info'));
  }

  ngOnInit(): void {
  }

}
