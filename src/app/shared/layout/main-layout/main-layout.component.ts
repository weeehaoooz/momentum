import { Component, inject, signal } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { NavbarComponent } from "../../nav/navbar/navbar.component";
import { ChatbotComponent } from '../../../project/components/chatbot/chatbot.component';
import { LayoutService } from './layout.service';

@Component({
  selector: 'mom-main-layout',
  imports: [
    CommonModule,
    NavbarComponent,
    ChatbotComponent,
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {
  private layoutService = inject(LayoutService);

  assistMode = this.layoutService.assistMode;
}
