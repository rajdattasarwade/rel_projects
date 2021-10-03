import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
// import {
//   trigger,
//   state,
//   animate,
//   transition,
//   style,
// } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { Section80cComponent } from './section-80c/section-80c.component';
import { InvestmentDeclarationRootService } from './investment-declaration-root.service';
import {
  BreadcrumbJson,
  FinancialYearModel,
  ShowDeclarationModel,
  Form12BBDetailModel,
  OverviewModel80c,
  OverviewModel80D,
  OverviewModelHouseLoan,
  OverviewModelHouseRentDeclaration,
  OverviewModelHouseRentReceipt,
  PickDateAdapter,
  PICK_FORMATS,
} from './investment-declaration-root.model';
import {
  HouseRentDeclarationColumnValues,
  HouseRentDeclarationColumns,
  SectionAColumns,
  SectionAColumnValues,
  SectionADataModel,
  HouseRentReceiptColumnValues,
  HouseRentReceiptColumns,
  Form12BBColumns,
  From12BBColumnValues,
  HouseRentReceiptColumnsNoValues,
  HouseRentReceiptColumnValuesNoValues,
} from './investment-declaration-root-table.model';
import { MatTableDataSource } from '@angular/material/table';
import { Section80dComponent } from './section80d/section80d.component';
import { InterestHousingLoanComponent } from './interest-housing-loan/interest-housing-loan.component';
import { HouseRentReceiptComponent } from './house-rent-receipt/house-rent-receipt.component';
import { HouseRentReceiptRootService } from './house-rent-receipt-root.service';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
@Component({
  selector: 'app-investment-declaration-root',
  templateUrl: './investment-declaration-root.component.html',
  styleUrls: ['./investment-declaration-root.component.css'],
  providers: [
    { provide: DateAdapter, useClass: PickDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS },
  ],
  // animations: [
  //   trigger('detailExpand', [
  //     state('collapsed', style({ height: '0px', minHeight: '0' })),
  //     state('expanded', style({ height: '*' })),
  //     transition(
  //       'expanded <=> collapsed',
  //       animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
  //     ),
  //   ]),
  // ],
})
export class InvestmentDeclarationRootComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  financialYear: string = '';
  financialYearDetailObj: FinancialYearModel;
  showDeclarationDetailObj: ShowDeclarationModel;
  section80cOverviewObj: OverviewModel80c;
  section80dOverviewObj: OverviewModel80D;
  houseLoanOverviewObj: OverviewModelHouseLoan;
  actualInvestment: number = 0;
  declaredInvestment: number = 0;
  sectionADataList: SectionADataModel[] = [];
  dataSourceSectionA: any;
  houseRentDeclarationColumns = HouseRentDeclarationColumns;
  houseRentDeclarationColumnValues = HouseRentDeclarationColumnValues;
  rupeeSymbol: string = '&#8377;';
  houseRentDeclarationDataList: OverviewModelHouseRentDeclaration[] = [];
  dataSourceHouseRentDeclaration: any;
  dataSourceHouseRentReceipt: any;
  dataSourceForm12bb: any;
  form12bbDetailObj: Form12BBDetailModel;
  form12bbDetailDataList: Form12BBDetailModel[];
  houseRentReceiptDataList: OverviewModelHouseRentReceipt[];
  houseRentReceiptColumns = HouseRentReceiptColumns;
  houseRentReceiptColumnsNoValue = HouseRentReceiptColumnsNoValues;
  houseRentReceiptColumnValues = HouseRentReceiptColumnValues;
  houseRentReceiptColumnValuesNoValues = HouseRentReceiptColumnValuesNoValues;
  form12bbColumns = Form12BBColumns;
  form12bbColumnValues = From12BBColumnValues;
  investmentDeclarationHeaderText: string = 'Investment Declaration 2020 - 21';
  isHouseRentReceiptAvailable: boolean = false;
  isHRAAvailable: boolean = false;
  dataSourceHouseRentReceiptNoValues = [];
  constructor(
    public dialog: MatDialog,
    private service: InvestmentDeclarationRootService,
    private changeDetectorRef: ChangeDetectorRef,
    private houseRentReceiptService: HouseRentReceiptRootService
  ) {
    this.subscription = new Subscription();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  breadcrumbJson: any = BreadcrumbJson;

  ngOnInit(): void {
    this.resetData();
    this.service.resetSectionADataList();
    this.getFinancialYearDetails();
    this.getShowDeclaration();
    this.getForm12BBDetails();
    this.getSection80cOverview();
    this.getSection80dOverview();
    this.getHouseLoanOverview();
    this.getHouseRentDeclarationOverview();
    this.getHouseRentReceiptOverview();
    this.getActualInvestments();
    this.getDeclaredInvestments();
    this.getSectionADataList();
  }

  /**
   * get API data
   */
  getFinancialYearDetails() {
    const sub = this.service.getMyInvestmentFinancialYear().subscribe(
      (data: FinancialYearModel) => {
        this.financialYearDetailObj = data;
        console.log('financialYearDetails=>', this.financialYearDetailObj);
        this.financialYear =
          this.financialYearDetailObj.startFinancialYear +
          '-' +
          this.financialYearDetailObj.endFinancialYear;
        this.investmentDeclarationHeaderText =
          'Investment Declaration ' + this.financialYear;
        this.service.setFinancialYear(this.financialYear);
      },
      (error) => {
        console.error('INVESTMENT-DECLERATION error=>', error);
      }
    );
    this.subscription.add(sub);
  }
  getShowDeclaration() {
    const sub = this.service.getMyInvestmentShowdeclaration().subscribe(
      (data: ShowDeclarationModel) => {
        this.showDeclarationDetailObj = data;
        console.log(
          'showDeclarationDetailObj=>',
          this.showDeclarationDetailObj
        );
      },
      (error) => {
        console.error('INVESTMENT-DECLERATION error=>', error);
      }
    );
    this.subscription.add(sub);
  }
  getForm12BBDetails() {
    const sub = this.service.getForm12BBDetails().subscribe(
      (data: Form12BBDetailModel) => {
        this.form12bbDetailObj = data;
        console.log('form12bDetailObj=>', this.form12bbDetailObj);
        this.populateForm12bbDetails();

        this.dataSourceForm12bb = new MatTableDataSource<Form12BBDetailModel>(
          this.form12bbDetailDataList
        );
      },
      (error) => {
        console.error('INVESTMENT-DECLERATION error=>', error);
      }
    );
    this.subscription.add(sub);
  }
  populateForm12bbDetails() {
    console.log('populateForm12bbDetails');
    this.form12bbDetailDataList = [];
    let item = this.form12bbDetailObj;
    let fromDate = item.financialStartDate
      ? new Date(item.financialStartDate)
      : null;
    let toDate = item.financialEndDate ? new Date(item.financialEndDate) : null;
    item.deductionName = 'Form 12 BB [' + this.financialYear + ']';

    item.fromDate = fromDate ? fromDate.toLocaleDateString() : 'No Records';
    item.toDate = toDate ? toDate.toLocaleDateString() : 'No Records';
    this.form12bbDetailDataList.push(item);
  }
  getSection80cOverview() {
    const sub = this.service.getSection80cOverview().subscribe(
      (data: OverviewModel80c[]) => {
        this.section80cOverviewObj = data[0];
        this.service.addToSectionADataList(
          this.section80cOverviewObj,
          'section80c'
        );
        console.log('section80cOverviewObj=>', this.section80cOverviewObj);
      },
      (error) => {
        console.error('INVESTMENT-DECLERATION error=>', error);
      }
    );
    this.subscription.add(sub);
  }
  getSection80dOverview() {
    const sub = this.service.getSection80dOverview().subscribe(
      (data: OverviewModel80D[]) => {
        this.section80dOverviewObj = data[0];
        this.service.addToSectionADataList(
          this.section80dOverviewObj,
          'section80d'
        );
        console.log('section80dOverviewObj=>', this.section80dOverviewObj);
      },
      (error) => {
        console.error('INVESTMENT-DECLERATION error=>', error);
      }
    );
    this.subscription.add(sub);
  }
  getHouseLoanOverview() {
    const sub = this.service.getHouseloanOverview().subscribe(
      (data: OverviewModelHouseLoan) => {
        this.houseLoanOverviewObj = data;
        this.service.addToSectionADataList(
          this.houseLoanOverviewObj,
          'housingloan'
        );
        console.log('houseLoanOverviewObj=>', this.houseLoanOverviewObj);
      },
      (error) => {
        console.error('INVESTMENT-DECLERATION error=>', error);
      },
      () => {
        console.log('finally of houseLoand');
        this.changeDetectorRef.detectChanges();
      }
    );
    this.subscription.add(sub);
  }
  getHouseRentDeclarationOverview() {
    const sub = this.service.getHouseRentDeclarationOverview().subscribe(
      (data: OverviewModelHouseRentDeclaration[]) => {
        this.houseRentDeclarationDataList = data;
        console.log(
          'jqama houseRentDeclarationData=>',
          this.houseRentDeclarationDataList
        );
        this.service.addHRADeclaraionToTotalInvestment(
          this.houseRentDeclarationDataList[0]
        );
        this.isHRAAvailable = this.houseRentDeclarationDataList[0].fromDate
          ? true
          : false;
        this.populateHouseRentDeclarationData();
        this.dataSourceHouseRentDeclaration = new MatTableDataSource<
          OverviewModelHouseRentDeclaration
        >(this.houseRentDeclarationDataList);
      },
      (error) => {
        console.error('INVESTMENT-DECLERATION error=>', error);
      }
    );
    this.subscription.add(sub);
  }
  populateHouseRentDeclarationData() {
    console.log('populateHouseRentDeclarationData');
    for (let item of this.houseRentDeclarationDataList) {
      let fromDate = item.fromDate ? new Date(item.fromDate) : null;
      let toDate = item.toDate ? new Date(item.toDate) : null;
      item.deductionName =
        'House Rent Declaration \n[' + this.financialYear + ']';
      if (fromDate) {
        var fromDateMM = fromDate.getMonth() + 1;
        var fromDateMMString =
          fromDateMM > 9 ? '' + fromDateMM : '0' + fromDateMM;
        var fromDateDD = fromDate.getDate();
        var fromDateDDString =
          fromDateDD > 9 ? '' + fromDateDD : '0' + fromDateDD;
        var fromDateYY = fromDate.getFullYear();
        var fromDateYYString =
          fromDateYY > 9 ? '' + fromDateYY : '0' + fromDateYY;
        var toDateMM = toDate.getMonth() + 1;
        var toDateMMString = toDateMM > 9 ? '' + toDateMM : '0' + toDateMM;
        var toDateDD = toDate.getDate();
        var toDateDDString = toDateDD > 9 ? '' + toDateDD : '0' + toDateDD;
        var toDateYY = toDate.getFullYear();
        var toDateYYString = toDateYY > 9 ? '' + toDateYY : '0' + toDateYY;
        item.period =
          fromDateDDString +
          '.' +
          fromDateMMString +
          '.' +
          fromDateYYString +
          ' to ' +
          toDateDDString +
          '.' +
          toDateMMString +
          '.' +
          toDateYYString;
      } else {
        item.period = 'No Records';
      }
    }
  }
  getActualInvestments() {
    const sub = this.service.actualInvestmentSubject.subscribe(
      (data: number) => {
        this.actualInvestment = data;
        console.log('root actualInvestment=>', this.actualInvestment);
      },
      (error) => {
        console.error('INVESTMENT-DECLERATION error=>', error);
      }
    );
    this.subscription.add(sub);
  }
  getDeclaredInvestments() {
    const sub = this.service.declaredInvestmentSubject.subscribe(
      (data: number) => {
        this.declaredInvestment = data;
        console.log('root declaredInvestment=>', this.declaredInvestment);
      },
      (error) => {
        console.error('INVESTMENT-DECLERATION error=>', error);
      }
    );
    this.subscription.add(sub);
  }
  getSectionADataList() {
    const sub = this.service.sectionADataListSubject.subscribe(
      (data: SectionADataModel[]) => {
        this.sectionADataList = data;
        console.log('root sectionAData=>', this.sectionADataList);
        this.dataSourceSectionA = new MatTableDataSource<SectionADataModel>(
          this.sectionADataList
        );
      },
      (error) => {
        console.error('INVESTMENT-DECLERATION error=>', error);
      }
    );
    this.subscription.add(sub);
  }
  getHouseRentReceiptOverview() {
    const sub = this.houseRentReceiptService
      .getHouseRentReceiptOverview()
      .subscribe(
        (data: OverviewModelHouseRentReceipt[]) => {
          this.houseRentReceiptDataList = data;
          console.log(
            'jqama houseRentReceiptDataList=>',
            this.houseRentReceiptDataList
          );
          this.isHouseRentReceiptAvailable = this.houseRentReceiptDataList[0]
            .fromDate
            ? true
            : false;
          this.populateHouseRentData();
          this.dataSourceHouseRentReceipt = new MatTableDataSource<
            OverviewModelHouseRentReceipt
          >(this.houseRentReceiptDataList);
        },
        (error) => {
          console.error('INVESTMENT-DECLERATION error=>', error);
        }
      );
    this.subscription.add(sub);
  }
  populateHouseRentData() {
    console.log('populateHouseRentReceiptData');
    for (let item of this.houseRentReceiptDataList) {
      item.deductionName = 'House Rent Receipt \n[' + this.financialYear + ']';
    }
  }
  /**
   * ENDS APi data getters
   */

  openComponentInPopup(component) {
    const dialogRef = this.dialog.open(component, {
      width: '800px',
    });
  }

  sectionAColumns = SectionAColumns;
  sectionAColumnValues = SectionAColumnValues;
  openForm12BB(flag) {
    console.log('openForm12BB...');
    this.service.formBBEdit = flag;
    this.service.inNavigateTo(['/payroll/form12bb']);
  }

  /**
   *
   * EVENTS Fuctions
   */

  viewSectionA(element: SectionADataModel) {
    console.log('viewSectionA(element)...', element);
    if (element.deductionName == 'Section 80 C deductions') {
      this.openSection80cPopup(element.referenceNumber, false,false);
    } else if (element.deductionName == 'Section 80 D & other deductions') {
      this.openSection80dPopup(element.referenceNumber, false,false);
    } else if (element.deductionName == 'Interest on Housing Loan') {
      console.log('Housing Loan open in popup');
      this.openHousingLoanPopup(false);
    } else {
      console.log('noting to do');
    }
  }
  openSection80cPopup(referenceNumber: string, edit: boolean,create:boolean) {
    const dialogRef = this.dialog.open(Section80cComponent, {
      width: '100%',
      height: '100%',
    });
    dialogRef.componentInstance.referenceNumber = referenceNumber;
    dialogRef.componentInstance.edit = edit;
    dialogRef.componentInstance.create = create;
    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }
  openSection80dPopup(referenceNumber: string, edit: boolean,create:boolean) {
    const dialogRef = this.dialog.open(Section80dComponent, {
      width: '100%',
      height: '100%',
    });
    dialogRef.componentInstance.referenceNumber = referenceNumber;
    dialogRef.componentInstance.edit = edit;
    dialogRef.componentInstance.create = create;
    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }
  openHousingLoanPopup(edit: boolean) {
    const dialogRef = this.dialog.open(InterestHousingLoanComponent, {
      width: '100%',
      height: '100%',
    });
    dialogRef.componentInstance.edit = edit;
    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }
  createSectionA(element) {
    console.log('createSectionA(element)', element);
  }
  printSectionA(element) {
    console.log('printSectionA(element)', element);
  }
  editSectionA(element,create:boolean) {
    console.log('editSectionA(element)', element);
    if (element.deductionName == 'Section 80 C deductions') {
      this.openSection80cPopup(element.referenceNumber, true,create);
    } else if (element.deductionName == 'Section 80 D & other deductions') {
      this.openSection80dPopup(element.referenceNumber, true,create);
    } else if (element.deductionName == 'Interest on Housing Loan') {
      console.log('Housing Loan open in popup');
      this.openHousingLoanPopup(true);
    } else {
      console.log('noting to do');
    }
  }

  viewHRADecleration(element) {
    console.log('viewHRADecleration(element)...', element);
  }
  createHRADecleration(element) {
    console.log('createHRADecleration(element)', element);
  }
  printHRADecleration(element) {
    console.log('printHRADecleration(element)', element);
  }
  editHRADecleration(element) {
    console.log('editHRADecleration(element)', element);
  }
  resetData() {
    this.service.attachFileMap80C = new Map();
    this.service.attacmentMap80c = new Map();
    this.service.attachFileMap80d = new Map();
    this.service.attacmentMap80d = new Map();
    this.service.listOFInvalidItems = [];
    this.service.isFormInvalid = false;
  }
  statusClass(status: string): string {
    return this.service.statusClass(status);
  }
  /**
   * EVENT FUNCTIONS ENDS
   */

  /**
   * HouseRentReceipt
   */

  viewHouseRentReceipt(element) {
    console.log('viewHouseRentReceipt(element)...', element);
    this.openHouseRentReceipt(false, false, element);
  }
  createHouseRentReceipt(element) {
    console.log('createHouseRentReceipt(element)', element);
    this.openHouseRentReceipt(false, true, element);
  }
  printHouseRentReceipt(element) {
    console.log('printHouseRentReceipt(element)', element);
  }
  editHouseRentReceipt(element) {
    console.log('editHouseRentReceipt(element)', element);
    this.openHouseRentReceipt(true, false, element);
  }
  openHouseRentReceipt(
    edit: boolean,
    create: boolean,
    element: OverviewModelHouseRentReceipt
  ) {
    const dialogRef = this.dialog.open(HouseRentReceiptComponent, {
      width: '800px',
      height: '600px',
    });
    dialogRef.componentInstance.edit = edit;
    dialogRef.componentInstance.element = element;
    dialogRef.componentInstance.create = create;
    dialogRef.componentInstance.financialYear = this.financialYear;
    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }
  /**
   * END HOUSE RENT RECEIPT
   */
} //class ends
