import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { Z5DetailsComponent } from '../components/z5-details/z5-details.component';
import { PositionDetailsComponent } from '../components/position-details/position-details.component';
import { JdDetailsComponent } from '../components/jd-details/jd-details.component';
import { DownloadDetailsComponent } from '../components/download-details/download-details.component';

const routes: Routes = [
  { path: 'z5', component: Z5DetailsComponent  },
  { path: 'position', component: PositionDetailsComponent },
  { path: 'z5/:id', component: JdDetailsComponent  },
  { path: 'position/:id', component: JdDetailsComponent  },
  { path: 'downloads', component: DownloadDetailsComponent  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule],
})
export class RoutingModule {}