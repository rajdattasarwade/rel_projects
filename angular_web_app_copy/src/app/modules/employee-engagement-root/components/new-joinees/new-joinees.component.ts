import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { EmployeeEngagementService } from '../../employee-engagement.service';
import { NewJoinee } from '../../models/new-joinee.model';
import { Subscription } from 'rxjs';
import { Config } from 'src/app/components/core/config/config';

@Component({
  selector: 'app-new-joinees',
  templateUrl: './new-joinees.component.html',
  styleUrls: ['./new-joinees.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NewJoineesComponent implements OnInit, OnDestroy {
  newJoinees: NewJoinee[] = [];
  allNewJoinees: NewJoinee[] = [];
  iconTextFlag:boolean=true
  iconText:string=''
  public subscriptionsList: Subscription[]=[];
  avtarUrl = Config.avtarUrl;
  imageUrl: string;
  constructor(private empService: EmployeeEngagementService) { }

  ngOnInit(): void {
    this.getJoinees();
  }
  getJoinees() {
    this.allNewJoinees=[]
    this.subscriptionsList.push(this.empService.getNewJoinees().subscribe((data: NewJoinee[]) =>{
      this.allNewJoinees = data;
      this.showMore()
    }))
  }
  showMore() {
    this.newJoinees = []
    if (this.allNewJoinees.length < 3) {
      this.iconText = ''
      this.newJoinees=this.allNewJoinees
    }
    else {
      if (this.iconTextFlag){
        this.iconText="SHOW MORE"
        for (let i = 0; i < 2; i++){
            this.newJoinees.push(this.allNewJoinees[i])
          }
      }
      else {
        this.iconText="HIDE"
        this.newJoinees=this.allNewJoinees
      }
    } 
    this.iconTextFlag=!this.iconTextFlag  
  }
  ngOnDestroy(){
    if(this.subscriptionsList.length > 0) this.subscriptionsList.forEach(subscription => { subscription.unsubscribe() })
  }
}
