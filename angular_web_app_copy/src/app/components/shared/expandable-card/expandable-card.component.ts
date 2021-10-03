import {
  Component,
  Inject,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-expandable-card',
  templateUrl: './expandable-card.component.html',
  styleUrls: ['./expandable-card.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('detailExpand', [
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
      transition(
        'expanded <=> void',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class ExpandableCardComponent implements OnInit {
  collapsed: boolean = true;
  @Input() leftMainHeader: any;
  @Input() rightMainHeader: any;
  @Input() leftHeaders: any;
  @Input() rightHeaders: any;
  @Input() modalData: any;
  @Input() collapsedData: any;
  leftData: any = [];
  rightData: any = [];
  collapseLeft: any = [];
  collapseRight: any = [];
  collapseLeftHeader: any = [];
  activeLeftData: any;
  activeRightData: any;
  activeLeftHeaderData: any;

  constructor() {}

  ngOnInit(): void {
    this.createLeftData();
    this.createRightData();
    this.createCollapseLeftHeader();
  }

  createLeftData() {
    this.leftHeaders.forEach((leftKey) => {
      let userObj = {
        key: leftKey,
        value: this.modalData[leftKey],
      };
      this.leftData.push(userObj);
    });
    this.createCollapseLeft();
  }

  createRightData() {
    this.rightHeaders.forEach((rightKey) => {
      let userObj = {
        key: rightKey,
        value: this.modalData[rightKey],
      };
      this.rightData.push(userObj);
    });
    this.createCollapseRight();
  }

  createCollapseLeftHeader() {
    this.leftMainHeader.forEach((header) => {
      if (
        this.collapsedData.findIndex(
          (collapseItem) => collapseItem == header
        ) != -1
      ) {
        this.collapseLeftHeader.push(header);
      }
    });
    this.activeLeftHeaderData = this.collapseLeftHeader;
  }

  createCollapseLeft() {
    this.leftData.forEach((leftItem) => {
      if (
        this.collapsedData.findIndex(
          (collapseItem) => collapseItem == leftItem.key
        ) != -1
      ) {
        let userObj = {
          key: leftItem.key,
          value: leftItem.value,
        };
        this.collapseLeft.push(userObj);
      }
    });
    this.activeLeftData = this.collapseLeft;
  }

  createCollapseRight() {
    this.rightData.forEach((rightItem) => {
      if (
        this.collapsedData.findIndex(
          (collapseItem) => collapseItem == rightItem.key
        ) != -1
      ) {
        let userObj = {
          key: rightItem.key,
          value: rightItem.value,
        };
        this.collapseRight.push(userObj);
      }
    });
    this.activeRightData = this.collapseRight;
  }

  expandValues() {
    this.activeLeftData = this.leftData;
    this.activeRightData = this.rightData;
    this.activeLeftHeaderData = this.leftMainHeader;
    this.collapsed = false;
  }

  collapseValues() {
    this.activeLeftData = this.collapseLeft;
    this.activeRightData = this.collapseRight;
    this.activeLeftHeaderData = this.collapseLeftHeader;
    this.collapsed = true;
  }
}
