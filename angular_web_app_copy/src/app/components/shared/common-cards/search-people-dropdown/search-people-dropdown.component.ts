import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PeopleService } from 'src/app/modules/people-root/services/people.service';

@Component({
  selector: 'app-search-people-dropdown',
  templateUrl: './search-people-dropdown.component.html',
  styleUrls: ['./search-people-dropdown.component.css'],
})
export class SearchPeopleDropdownComponent implements OnInit {
  searchPeopleForm: FormGroup;
  @Input() peopleOptions;
  @Output() onValueSelection = new EventEmitter<any>();
  filteredPeopleOptions: any = [];
  myControl = new FormControl('');
  errorFlag: boolean = false
  customMax: number;
  constructor(private peopleService: PeopleService) { }

  ngOnInit(): void {
  }
  peoplesPresent(data) {
    this.errorFlag = false
    if (data.length > 3) {
      if (isNaN(data)) {
        this.customMax = null
      }
      else {
        this.customMax = 10
      }
      this.peopleService.searchEmployeeInfo(data).subscribe(((response: any) => {
        this.filteredPeopleOptions = response
        if (this.filteredPeopleOptions.length == 0) {
          this.errorFlag = true
        }
      }))
    }
    else if (data.length < 3) {
      this.errorFlag = false
      this.filteredPeopleOptions = [];
    }
  }
  selectedValue(value) {
    this.errorFlag = false
    this.myControl.setValue('')
    document.getElementById('search').blur()
    this.onValueSelection.emit(value);
    this.filteredPeopleOptions = []
  }
  resetSearch() {
    this.errorFlag = false
    this.filteredPeopleOptions = []
    this.myControl.setValue('')
    document.getElementById('search').blur()
  }
}