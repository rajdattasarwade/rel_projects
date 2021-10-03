import { Component, OnInit } from '@angular/core';
import { Subscription } from '../../../../../../../node_modules/rxjs';
import { RelativeDetailsModel, AddRelativePayload } from '../family-details-model';
import { PersonalDetailsService } from '../../../services/personal-details.service';
import { MessageModalService } from 'src/app/components/shared/services/message-modal-service';

@Component({
  selector: 'app-relatives-reliance',
  templateUrl: './relatives-reliance.component.html',
  styleUrls: ['./relatives-reliance.component.css']
})
export class RelativesRelianceComponent implements OnInit {

  displayedColumns: string[] = ['relationship', 'relativename', 'action'];
  private subscription: Subscription;
  dataSource: RelativeDetailsModel[] = [];
  relativeOverview: any;
  relativeDetailsList: RelativeDetailsModel[] = [];
  
  constructor(public personalDService : PersonalDetailsService,
              private messageModalService: MessageModalService) {
                this.subscription = new Subscription();
               }

  ngOnInit(): void {
    this.getRelativeOveview();
  }

  getRelativeOveview() {
    let subRelative = this.personalDService.getRelativeDetailsOverviewAPI().subscribe(
      (data) => {
        console.log('getRelativeOveview...data...=>', data);
        this.relativeOverview = data;
        this.relativeDetailsList = this.relativeOverview['relativeList'];
        if (this.relativeDetailsList.length == 0) {
          this.showConfirmationPopup('Do you have any relatives in Reliance?');
        } else {
          this.dataSource = this.relativeDetailsList;
        }
      },
      (error) => {
        console.error('getRelativeOveview....error.....=>', error);
      }
    );
    this.subscription.add(subRelative);
  }
  showConfirmationPopup(message: string) {
    this.messageModalService.showConfirmation(
      message,
      'Declaration',
      'confirmation-icon',
      this.confirmationResponse.bind(this),
      'Yes',
      'No'
    );
  }

  confirmationResponse(d) {
    if (d == 'YES') {
      this.addFormRow();
    } else {
      this.addRelative(new AddRelativePayload());
    }
  }

  addRelative(addRelativePayload) {
    let subAddRelative = this.personalDService
      .saveRelativePostAPI(addRelativePayload)
      .subscribe(
        (data) => {
          console.log('addRelative response .....=>', data);
          this.ngOnInit();
        },
        (error) => {
          console.error('addRelative...error...', error);
        }
      );
    this.subscription.add(subAddRelative);
  }
  addFormRow() {
    console.log('addFormRow...');
    //this.openRelativeModal(false);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
