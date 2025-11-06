import { CommonModule, TitleCasePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { IIssue } from './issue.interface';

@Component({
  selector: 'mom-issue-card',
  imports: [
    CommonModule,
    TitleCasePipe,
    MatIconModule
  ],
  templateUrl: './issue-card.component.html',
  styleUrl: './issue-card.component.scss'
})
export class IssueCardComponent {

  issue = input<IIssue>();

  toggleNeIssueCard() {

  }
}
