import { Component, computed, inject } from '@angular/core';
import { ProjectViewNavComponent } from "../components/project-view-nav/project-view-nav.component";
import { ProjectsService } from '../../services/projects.service';

@Component({
  selector: 'mom-overview',
  imports: [
    ProjectViewNavComponent
  ],
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss', '../project-base.scss']
})
export class OverviewComponent {
  private readonly projectService = inject(ProjectsService);

  project = this.projectService.currentProject;
  projectId = computed(() => this.project()?.code ?? null);
}
