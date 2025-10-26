import { Component } from '@angular/core';
import { LogoComponent } from "../../components/logo/logo.component";
import { SearchBarComponent } from "../../components/search-bar/search-bar.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'mom-navbar',
  imports: [
    LogoComponent,
    SearchBarComponent,
    RouterLink
],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

}
