import { Component, inject } from '@angular/core';
import { ProjectCardComponent } from "./components/project-card/project-card.component";
import { IProject, ProjectsService } from '../services/projects.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ModalService } from '../shared/components/modal/modal.service';
import { CreateProjectModalComponent } from './components/create-project-modal/create-project-modal.component';
import { CdkDropList, CdkDrag, CdkDragDrop, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";

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
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  private readonly modalService = inject(ModalService);
  private readonly projectService = inject(ProjectsService);
  
  projects = this.projectService.projects;

  showCreateProject() {
    this.modalService.openModal(CreateProjectModalComponent, []);
  }

  drop(event: CdkDragDrop<IProject[]>) {
    moveItemInArray(this.projects(), event.previousIndex, event.currentIndex);
  }
}
