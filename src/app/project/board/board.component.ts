import { Component, computed, inject, signal } from '@angular/core';
import { SwimlaneComponent } from '../../components/swimlane/swimlane.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { IProject, ProjectsService } from '../../services/projects.service';
import { SwimlanesService } from '../../services/swimlanes.service';
import { ProjectViewNavComponent } from '../components/project-view-nav/project-view-nav.component';
import { IProjectTask, ITask, ITaskStatusEnum } from '../../components/task-card/task.interface';

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
  private readonly projectService = inject(ProjectsService);
  private readonly swimlaneService = inject(SwimlanesService);

  project = this.projectService.currentProject;
  projectId = computed(() => this.project()?.code ?? null);

  swimlanes = computed(() => {
    const swimlanes = this.swimlaneService.swimlanes();
    // Map tasks to swimlanes
    const tasks = this.project()?.tasks ?? [];
    swimlanes.forEach(swimlane => {
      swimlane.tasks = tasks.filter(task => task.status === swimlane.criteria);
    });
    return swimlanes;
  });

  connectedIds(swimlaneId: string) {
    return this.swimlanes().map(l => l.id).filter(id => id !== swimlaneId);
  }

  onTaskMoved(task: ITask) {
    const currentProject = this.project();
    const projectTasks = currentProject?.tasks ?? [];
    const projectTaskIndex = projectTasks.findIndex(t => t.id === task.id);    

    if (currentProject) {
      const projectTask = projectTasks[projectTaskIndex];
      projectTasks[projectTaskIndex] = projectTask;
      currentProject.tasks = projectTasks;
      this.projectService.currentProject.set({...currentProject});
    }
  }

  createSwimlane() {

  }
}
