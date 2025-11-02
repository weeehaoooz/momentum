import { Component, effect, inject, signal } from '@angular/core';
import { ProjectCardComponent } from "./components/project-card/project-card.component";
import { IProject, ProjectsService, IProjectData } from '../services/projects.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ModalService } from '../shared/components/modal/modal.service';
import { CreateProjectModalComponent } from './components/create-project-modal/create-project-modal.component';
import { CdkDropList, CdkDrag, CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";

@Component({
  selector: 'mom-projects',
  imports: [
    ProjectCardComponent,
    MatButtonModule,
    MatIconModule,
    CdkDropList,
    CdkDrag
  ],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {
  private readonly modalService = inject(ModalService);
  private readonly projectService = inject(ProjectsService);
  private skipEffect = false;

  // keep a reference to the signal; template/logic will use projects()
  projectsMap = this.projectService.projects;
  projects = signal<IProjectData[]>([]);

  // expose an ordered array (by .order) for template and drag-drop

  constructor() {
    effect(() => {
      if (this.skipEffect) {
        this.skipEffect = false;
        return;
      } else {
        const map = this.projectService.projects();
        const arr = Array.from(map.values());
        this.projects.set(arr.sort((a, b) => (a.order ?? 0) - (b.order ?? 0)));
      }
    });
  }

  showCreateProject() {
    this.modalService.openModal(CreateProjectModalComponent, []);
  }

  // Update the Map signal when user reorders items via drag & drop
  drop(event: CdkDragDrop<IProjectData[]>) {
    // Update the signal
    const current = this.projects();
    moveItemInArray(current, event.previousIndex, event.currentIndex);
    this.projects.set(current);

    // Persist to local storage with new order
    this.skipEffect = true;
    const projectMap = new Map<string, IProjectData>(current.map((project, index) => [project.code, { ...project, order: index } as IProjectData]));
    this.projectService.projects.set(projectMap);
    this.projectService.persistProjects();
  }
}
