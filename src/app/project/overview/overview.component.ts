import { Component, computed, inject } from '@angular/core';
import { IssueListComponent } from "../components/issue-list/issue-list.component";
import { ProjectViewNavComponent } from "../components/project-view-nav/project-view-nav.component";
import { ChatbotComponent } from '../components/chatbot/chatbot.component';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'mom-overview',
  imports: [
    ProjectViewNavComponent,
    IssueListComponent,
    ChatbotComponent
  ],
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss', '../project-base.scss']
})
export class OverviewComponent {
  private readonly projectService = inject(ProjectService);

  project = this.projectService.project;
  projectId = computed(() => this.project()?.code ?? null);
}
