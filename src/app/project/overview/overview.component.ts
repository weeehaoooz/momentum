import { Component, computed, inject } from '@angular/core';
import { ProjectViewNavComponent } from "../components/project-view-nav/project-view-nav.component";
import { ProjectsService } from '../../services/projects.service';
import { ProjectService } from '../services/project.service';
import { IssueListComponent } from "../components/issue-list/issue-list.component";

@Component({
  selector: 'mom-overview',
  imports: [
    ProjectViewNavComponent,
    IssueListComponent
],
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss', '../project-base.scss']
})
export class OverviewComponent {
  private readonly projectService = inject(ProjectService);

  project = this.projectService.project;
  projectId = computed(() => this.project()?.code ?? null);
}
