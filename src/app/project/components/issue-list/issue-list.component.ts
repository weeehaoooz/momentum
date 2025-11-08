import { Component, computed, inject, signal } from '@angular/core';
import { IssueLineComponent } from "./components/issue-line/issue-line.component";
import { ProjectService } from '../../services/project.service';
import { MatIconModule } from '@angular/material/icon';
import { CreateIssueCardComponent } from './components/create-issue-card/create-issue-card.component';
import { MatButtonModule } from '@angular/material/button';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from "@angular/cdk/drag-drop";
import { IProject } from '../../../services/projects.service';

@Component({
  selector: 'mom-issue-list',
  imports: [
    IssueLineComponent,
    MatButtonModule,
    MatIconModule,
    CreateIssueCardComponent,
    CdkDropList,
    CdkDrag
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

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      const issues = this.project()?.issues ?? [];
      moveItemInArray(issues, event.previousIndex, event.currentIndex);
      this.projectService.project.set({ ...this.project(), issues: issues } as IProject);
      this.projectService.updateProject(this.project()?.code ?? '', this.project() as IProject);
    }
  }

}
