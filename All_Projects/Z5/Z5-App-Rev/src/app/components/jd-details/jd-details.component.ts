import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetDetailsService } from '../../shared/get-details.service';

@Component({
  selector: 'app-jd-details',
  templateUrl: './jd-details.component.html',
  styleUrls: ['./jd-details.component.css']
})
export class JdDetailsComponent implements OnInit {
  csrfToken;
  responseBody:any=[];
  constructor(private route: ActivatedRoute, private getDetailsService: GetDetailsService) { }

  ngOnInit() {
    document.getElementById('loading').style.display = 'block';
    this.responseBody['ImZ5'] = "";
    const id = this.route.snapshot.paramMap.get('id');
    this.getDetailsService.toggleDropdownVisibility(false);
    this.getDetailsService.toggleShowBackButton(true);
    this.getDetailsService.getJDDetails(id).subscribe(
      (response) => {
        //this.spinner.hide('loading');
        document.getElementById('loading').style.display = 'none';
        this.csrfToken = response['headers'].get('X-CSRF-Token');
        this.responseBody = response.body.d;
        console.log(this.responseBody);
      },
      (error) => {
        document.getElementById('loading').style.display = 'none';
        //this.spinner.hide('loading');
        console.log(error);
      }
    );
  }

  ngOnDestroy() {
    this.getDetailsService.toggleDropdownVisibility(true);
    this.getDetailsService.toggleShowBackButton(false);
  }

}
