import { Component, computed, inject } from '@angular/core';
import { SwimlaneComponent } from '../../components/swimlane/swimlane.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SwimlanesService } from '../../services/swimlanes.service';
import { ProjectViewNavComponent } from '../components/project-view-nav/project-view-nav.component';
import { IIssue } from '../components/issue-card/issue.interface';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'mom-board',
  imports: [
    MatIconModule,
    MatButtonModule,
    SwimlaneComponent,
    ProjectViewNavComponent
  ],
  templateUrl: './board.component.html',
  styleUrls: [
    './board.component.scss',
    '../project-base.scss'
  ]
})
export class BoardComponent {
  private readonly projectService = inject(ProjectService);
  private readonly swimlaneService = inject(SwimlanesService);

  project = this.projectService.project;
  projectId = computed(() => this.project()?.code ?? null);

  swimlanes = computed(() => {
    const swimlanes = this.swimlaneService.swimlanes();
    // Map issues to swimlanes
    const issues = this.project()?.issues ?? [];
    swimlanes.forEach(swimlane => {
      swimlane.issues = issues.filter(issue => issue.status === swimlane.criteria);
    });
    return swimlanes;
  });

  connectedIds(swimlaneId: string) {
    return this.swimlanes().map(l => l.id).filter(id => id !== swimlaneId);
  }

  onIssueMoved(task: IIssue) {
    const currentProject = this.project();
    const projectIssues = currentProject?.issues ?? [];
    const projectTaskIndex = projectIssues.findIndex(t => t.id === task.id);    

    if (currentProject) {
      const projectTask = projectIssues[projectTaskIndex];
      projectIssues[projectTaskIndex] = projectTask;
      currentProject.issues = projectIssues;
      this.projectService.project.set({...currentProject});
    }
  }

  createSwimlane() {

  }
}
