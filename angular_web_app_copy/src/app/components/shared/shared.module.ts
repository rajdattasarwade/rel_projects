import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComingSoonComponent } from '../../components/shared/common-cards/coming-soon/coming-soon.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { RestrictedFormInputDirective } from './directives/restricted-form-input.directive';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { VideoPlayerComponent } from './video-player/video-player/video-player.component';
import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { VgStreamingModule } from '@videogular/ngx-videogular/streaming';
import { TwoDigitDecimaNumberDirective } from '../common/directives/two-digit-decima-number.directive';

@NgModule({
  declarations: [
    ComingSoonComponent,
    ErrorPageComponent,
    LoadingSpinnerComponent,
    RestrictedFormInputDirective,
    VideoPlayerComponent,
    TwoDigitDecimaNumberDirective,
  ],
  imports: [
    NgxSpinnerModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    VgStreamingModule,
    MatDialogModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    ComingSoonComponent,
    ErrorPageComponent,
    NgxSpinnerModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    VgStreamingModule,
    LoadingSpinnerComponent,
    RestrictedFormInputDirective,
    MatDialogModule,
    VideoPlayerComponent,
    TwoDigitDecimaNumberDirective,
  ],
  providers: [
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: {} },
  ],
})
export class SharedModule {}
