import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/common/header/header.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { BottomSheetComponent } from './components/common/bottom-sheet/bottom-sheet.component';
import { SidenavBarComponent } from './components/common/sidenav-bar/sidenav-bar.component';
import { HomeModule } from './modules/home-root/home.module';
import { HomeRoutingModule } from './modules/home-root/home-routing.module';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core.module';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { CommonService } from './components/common/common.service';
// import { CommonService } from './components/common/common.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HrssInterceptor } from './components/core/interceptor/hrssInterceptor';
import { AuthService } from './components/core/services/auth.service';
import { LoginService } from './components/core/services/login.service';
import { UserService } from './components/core/services/user.service';
import { LoginPage } from './components/core/misc/login-page';
import { CookieService } from './components/core/services/cookie.service';
import { RewardsAndRecognitionService } from './modules/rewards-and-recognition-root/rewards-and-recognition.service';
import { SharedModule } from './../app/components/shared/shared.module';
import { DataService } from './data.service';
import { LoadingSpinnerService } from './components/shared/loading-spinner/loading-spinner.service';
import { HelperService } from './components/core/services/helper.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BottomSheetComponent,
    SidenavBarComponent,
    LandingPageComponent,
    LoginPage,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HomeModule,
    HomeRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
  ],
  providers: [
    CommonService,
    AuthService,
    LoginService,
    UserService,
    CookieService,
    DataService,
    RewardsAndRecognitionService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HrssInterceptor,
      multi: true,
    },
    LoadingSpinnerService,
    HelperService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
