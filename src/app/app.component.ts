import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainLayoutComponent } from "./shared/layout/main-layout/main-layout.component";
import {
  ModuleRegistry,
  AllCommunityModule,
} from 'ag-grid-community';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MainLayoutComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'taskify-frontend';
}

ModuleRegistry.registerModules([
  AllCommunityModule,
]);
