import { CommonModule, TitleCasePipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { IIssue } from './issue.interface';
import { ProjectService } from '../../services/project.service';

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
  private projectService = inject(ProjectService);
  issue = input<IIssue>();

  toggleNeIssueCard() {

  }

  deleteIssue() {
    if (this.issue() && this.issue()?.id) {
      console.log(this.issue()?.id);
      this.projectService.deleteIssue(this.issue()?.id);
    }
  }
}
