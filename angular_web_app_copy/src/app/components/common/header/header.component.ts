import { Component, EventEmitter, Output } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Config } from '../../core/config/config';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  public faSearch = faSearch;

  @Output() sidenavToggle = new EventEmitter<void>();

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  logout() {
    // window.location.href = Config.logoutUrl;
    // alert('You are now being redirected to the login page');
    // window.setTimeout(function () {
    //   window.location.href = Config.logoutUrl;
    window.location.href = Config.logoutUrl;
    // }, 3000);
  }
}
