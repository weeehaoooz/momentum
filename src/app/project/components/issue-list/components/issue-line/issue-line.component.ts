import { Component, input } from '@angular/core';
import { IIssue } from '../../../issue-card/issue.interface';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'mom-issue-line',
  imports: [
    TitleCasePipe
  ],
  templateUrl: './issue-line.component.html',
  styleUrl: './issue-line.component.scss'
})
export class IssueLineComponent {

  issue = input<IIssue>();
}
