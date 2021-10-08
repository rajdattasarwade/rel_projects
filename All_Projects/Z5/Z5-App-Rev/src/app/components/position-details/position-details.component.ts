import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { GetDetailsService } from '../../shared/get-details.service';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-position-details',
  templateUrl: './position-details.component.html',
  styleUrls: ['./position-details.component.css']
})
export class PositionDetailsComponent implements OnInit {
  DataSource:any = null;
  DisplayedColumns=['type','pernr', 'name', 'email'];
  positionForm: FormGroup;
  positionValue;
  errorMsg:string="";
  csrfToken;
  responseBody:any=[];
  isShown: boolean = false ;

  constructor(
    private getDetailsService: GetDetailsService, 
    private router: Router
    //private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.positionForm = new FormGroup({
      positionname: new FormControl()
    });
  }

  onSubmit(form: FormGroup) {
    console.log('Valid?', form.valid); // true or false
    console.log('Name', form.value.positionname);
    //this.spinner.show();
    document.getElementById('loading').style.display = 'block';
    if(form.value.positionname!=""){
      this.positionValue  = form.value.positionname;
      this.getDetailsService.getPositionDetails(form.value.positionname).subscribe(
        (response) => {
          //this.spinner.hide('loading');
          this.csrfToken = response['headers'].get('X-CSRF-Token');
          this.DataSource = new MatTableDataSource(response.body.d.results);
          this.errorMsg="";
          setTimeout(()=>{
            document.getElementById('loading').style.display = 'none';
          },1000);
        },
        (error) => {
          setTimeout(()=>{
            document.getElementById('loading').style.display = 'none';
          },1000);
          this.errorMsg = error.error.error.message.value;
        }
      );
    }
  }

}
