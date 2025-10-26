import { Component, computed, inject } from '@angular/core';
import { ProjectViewNavComponent } from '../components/project-view-nav/project-view-nav.component';
import { ProjectsService } from '../../services/projects.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'mom-list',
  imports: [
    ProjectViewNavComponent,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './list.component.html',
  styleUrls: [
    './list.component.scss',
    '../project-base.scss'
  ]
})
export class ListComponent {
  private readonly projectService = inject(ProjectsService);

  project = this.projectService.currentProject;
  projectId = computed(() => this.project()?.code ?? null);

  sort() {}

  filter() {}
}
