import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { GetDetailsService } from '../app/shared/get-details.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  flag;
  currentUrl;
  currentPath:string;
  title = 'Z5-App';
  selectedTab:any;
  showDropdown: boolean = true;
  isShowBackButton:boolean = false;
  constructor(private router: Router, private getDetailsService: GetDetailsService, private location: Location, private route: ActivatedRoute){}

  ngOnInit(){
    this.getDetailsService.showDropVal.subscribe((value) => {
      this.showDropdown = value
    });
    this.getDetailsService.showBackButton.subscribe((value) => {
      this.isShowBackButton = value
    });
    this.currentUrl = this.router.url;
    this.currentPath = this.location.path();
    
    if(this.currentPath.indexOf("z5") !== -1){
      this.selectedTab=1;
      //console.log(1);
    } else if(this.currentPath.indexOf("position") !== -1){
      this.selectedTab=2;
      //console.log(2);
    } else if(this.currentPath.indexOf("download") !== -1){
      this.selectedTab=3;
      //console.log(3);
    }
    //console.log(this.currentUrl);
    //console.log(this.location.path());

  }

  onRadioChange(event){
    
    if(event.value==1){
      console.log(event.value);
      this.router.navigate(['/z5']);
    } else if(event.value==2){
      this.router.navigate(['/position']);
    } else if(event.value==3){
      this.router.navigate(['/downloads']);
    }
  }

  goBack(){
    const mycurrArr = this.currentPath.split("/");
    if(mycurrArr.length>=3){
      this.router.navigate(['/z5', { id: mycurrArr[2]}]);
    } else {
      this.router.navigate(['/z5']);
    }
    
  }
}
