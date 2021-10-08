import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-template-sample',
  templateUrl: './template-sample.component.html',
  styleUrls: ['./template-sample.component.css']
})
export class TemplateSampleComponent implements OnInit {

  states: Array<String> = ['AR', 'AL', 'CA', 'DC'];
  user = { fname:"Raj", lname:"Sarwade"};
  constructor() { }

  ngOnInit() {
  }

  onSubmitHandler(myform){
    console.log(this.user);
    console.log(myform.value);
    console.log(myform);
  }

}
