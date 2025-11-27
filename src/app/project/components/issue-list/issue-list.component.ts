import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridOptions } from 'ag-grid-community';
import { IProject } from '../../../services/projects.service';
import { ProjectService } from '../../services/project.service';
import { IssueIdCellComponent } from '../cell-renderers/issue-id-cell/issue-id-cell.component';
import { IssueStatusCellComponent } from '../cell-renderers/issue-status-cell/issue-status-cell.component';
import { IIssue } from '../issue-card/issue.interface';

@Component({
  selector: 'mom-issue-list',
  imports: [
    MatButtonModule,
    MatIconModule,
    AgGridAngular
  ],
  templateUrl: './issue-list.component.html',
  styleUrl: './issue-list.component.scss'
})
export class IssueListComponent {
  private projectService = inject(ProjectService);

  project = this.projectService.project;
  showNewIssueCard = signal<boolean>(true);

  issues = computed(() => this.projectService.project()?.issues ?? []);

  columnDefs = [
    {
      field: 'id', headerName: 'Issue ID',
      cellRenderer: IssueIdCellComponent,
      width: 120
    },
    {
      field: 'title',
      headerName: 'Title',
      flex: 1,
      resizable: true,
    },
    {
      field: 'status', headerName: 'Status',
      cellRenderer: IssueStatusCellComponent,
      sortable: true
    },
    {
      field: 'description', headerName: 'Description',
      suppressAutoSize: true,
      flex: 1, sortable: true
    },
  ] as ColDef<IIssue>[];

  gridOptions = {
    rowDragEntireRow: true,
    rowDragManaged: true,
  } as GridOptions<IIssue>;

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
