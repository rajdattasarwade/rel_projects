import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import {
  breadcrumbAddNewElementJson,
  ChoicePayComponentModel,
  EXCLUSIVE_CHOICEPAY_COMPONENTS,
} from '../../choicepay-root.model';
import { ErrorModalComponent } from '../../error-modal/error-modal.component';
import { ChoicepayRootService } from '../../choicepay-root.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-new-element',
  templateUrl: './add-new-element.component.html',
  styleUrls: ['./add-new-element.component.css'],
})
export class AddNewElementComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  private exclusiveChoiceComponent = EXCLUSIVE_CHOICEPAY_COMPONENTS;
  displayedColumns: string[] = [
    'select',
    'choicePayElement',
    'minimumAmount',
    'maximumAmount',
    'fixedAmount',
  ];

  selection = new SelectionModel<ChoicePayComponentModel>(true, []);
  breadcrumbJson = breadcrumbAddNewElementJson;
  ELEMENT_DATA: ChoicePayComponentModel[];
  dataSource: any;
  constructor(public dialog: MatDialog, private service: ChoicepayRootService) {
    this.subscription = new Subscription();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngOnInit(): void {
    this.getChoicePayComponent();
    this.dataSource = new MatTableDataSource<ChoicePayComponentModel>(
      this.ELEMENT_DATA
    );
  }
  getChoicePayComponent() {
    let sub = this.service.choicePayAllNewAvailableComponentsSubject.subscribe(
      (data) => {
        this.ELEMENT_DATA = data;
        console.log('ELEMET_DATA=>', this.ELEMENT_DATA);
      }
    );
    this.subscription.add(sub);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */

  /** The label for the checkbox on the passed row */
  selectedItems: ChoicePayComponentModel[] = [];
  isFormValid: boolean = true;

  checkboxLabel(row?: ChoicePayComponentModel): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'}`;
  }

  openErrorModal() {
    const dialogRef = this.dialog.open(ErrorModalComponent, {
      width: '500px',
    });
  }
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  populateSelectedItems() {
    let count = 0;
    for (let item of this.ELEMENT_DATA) {
      if (
        this.selection.isSelected(item) &&
        (item.isEditable || item.amount > 0)
      ) {
        count++;
        item.hasSelected = true;
        if (
          this.exclusiveChoiceComponent.includes(item.component) &&
          count > 1
        ) {
          this.isFormValid = false;
        }
        this.selectedItems.push(item);
      }
    }
  }
  continue() {
    console.log('continue...');
    this.isFormValid = true;
    this.populateSelectedItems();
    console.log('selecteditems=>', this.selectedItems);
    if (this.isFormValid) {
      this.service.addChoicePayComponents(this.selectedItems);
      this.service.choicepayNavigateTo(['/payroll/choicepay']);
    } else {
      this.selectedItems = [];
      this.openErrorModal();
    }
  }
}
