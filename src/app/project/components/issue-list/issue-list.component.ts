import { Component, computed, inject, signal } from '@angular/core';
import { IssueLineComponent } from "./components/issue-line/issue-line.component";
import { ProjectService } from '../../services/project.service';
import { MatIconModule } from '@angular/material/icon';
import { CreateIssueCardComponent } from './components/create-issue-card/create-issue-card.component';

@Component({
  selector: 'mom-issue-list',
  imports: [
    IssueLineComponent,
    MatIconModule,
    CreateIssueCardComponent
  ],
  templateUrl: './issue-list.component.html',
  styleUrl: './issue-list.component.scss'
})
export class IssueListComponent {
  private projectService = inject(ProjectService);

  project = this.projectService.project;
  showNewIssueCard = signal<boolean>(true);

  issues = computed(() => this.projectService.project()?.issues ?? []);

  toggleNewIssueCard() {
    this.showNewIssueCard.set(!this.showNewIssueCard());
  }
}
