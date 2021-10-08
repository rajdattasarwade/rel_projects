import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { GetDetailsService } from '../../shared/get-details.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-z5-details',
  templateUrl: './z5-details.component.html',
  styleUrls: ['./z5-details.component.css']
})
export class Z5DetailsComponent implements OnInit {
  submitForm;
  currentUrl;
  errorMsg:string="";
  z5Value;
  z5Form: FormGroup;
  csrfToken;
  responseBody:any=[];
  DisplayedColumns=['z5','asset','business','begindate','enddate','graderange','segment','action'];
  isShown: boolean = false ;
  constructor(
    private getDetailsService: GetDetailsService, 
    private router: Router,
    private location: Location
    //private spinner: NgxSpinnerService
    ) { }

  ngOnInit() {
    this.z5Form = new FormGroup({
      z5name: new FormControl()
    });

    this.currentUrl = this.location.path();
    if(this.currentUrl.indexOf("id")!==-1){
      //console.log(this.currentUrl);
      const myArr = this.currentUrl.split(";id=");
      this.z5Form.patchValue({
        z5name: myArr[1]
      });
      this.onSubmit(this.z5Form);
      // this.submitForm = document.getElementById('z5form') as HTMLFormElement;
      // this.submitForm.submit();
    }
    
    this.responseBody['Z5'] = "";
  }

  onSubmit(form: FormGroup) {
    //this.spinner.show('loading');
    console.log('Valid?', form.valid); // true or false
    console.log('Name', form.value.z5name);
    //this.spinner.show();
    //this.openDialog();
    if(form.value.z5name!=""){
      this.z5Value  = form.value.z5name;
      document.getElementById('loading').style.display = 'block';
      this.isShown = false;
      this.getDetailsService.getZ5Details(form.value.z5name).subscribe(
        (response) => {
          //this.spinner.hide('loading');
          this.csrfToken = response['headers'].get('X-CSRF-Token');
          this.responseBody = response.body.d;
          if(response.body.d.Z5!="" || response.body.d.Z5!=null){
            this.isShown = true;
            this.errorMsg="";
          } else {
            this.isShown = false;
            this.errorMsg = "No Z5 Data Found";
          }
          setTimeout(()=>{
            document.getElementById('loading').style.display = 'none';
          },1000);
        },
        (error) => {
          setTimeout(()=>{
            document.getElementById('loading').style.display = 'none';
          },1000);
          this.isShown = false;
          this.errorMsg = error.error.error.message.value;
        }
      );
    }
  }

  onViewDetails(){
    document.getElementById('loading').style.display = 'block';
    this.router.navigate(['/z5', this.z5Value]);
  }
  onDownloadZ5(){
    window.open("/sap/opu/odata/sap/ZHR_Z5_POSITION_DETAILS_SRV/Z5DownloadSet(Z5='"+this.z5Value+"')/$value","_blank");
    window.open("/sap/opu/odata/sap/ZHR_Z5_POSITION_DETAILS_SRV/JDDownloadSet(Z5='"+this.z5Value+"')/$value","_blank");
  }
  // openDialog() {
  //     const dialogConfig = new MatDialogConfig();

  //     dialogConfig.disableClose = true;
  //     dialogConfig.autoFocus = true;
  //     dialogConfig.data = {
  //         id: 1,
  //         title: 'Testing Dialog'
  //     };
  //     dialogConfig.width = "400px";
  //     dialogConfig.height= "600px";
  //     //this.dialog.open(Z5DialogComponent, dialogConfig);

  //     const dialogRef = this.dialog.open(Z5DialogComponent, dialogConfig);

  //     dialogRef.afterClosed().subscribe(
  //         data => console.log("Dialog output:", data)
  //     );
  // }

}
