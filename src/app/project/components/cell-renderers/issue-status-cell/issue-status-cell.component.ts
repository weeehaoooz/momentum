import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { IIssue } from '../../issue-card/issue.interface';

@Component({
  selector: 'mom-issue-status-cell',
  imports: [
    CommonModule
  ],
  templateUrl: './issue-status-cell.component.html',
  styleUrl: './issue-status-cell.component.scss'
})
export class IssueStatusCellComponent implements ICellRendererAngularComp {

  issue = signal<IIssue | null>(null);

  agInit(params: ICellRendererParams<any, any, any>): void {
    this.issue.set(params.data);
  }
  refresh(params: ICellRendererParams<any, any, any>): boolean {
    this.issue.set(params.data)
    return true;
  }

  statusBackgroundColor(status?: string) {

    switch (status?.toUpperCase()) {
      case 'TODO':
        return '#2684FF';
      case 'IN_PROGRESS':
        return '#FFAB00';
      case 'DONE':
        return '#33aa53ff';
      default:
        return 'transparent';
    }
  }

  statusColor(status?: string) {
    switch (status?.toUpperCase()) {
      case 'TODO':
        return '#FFF';
      case 'IN_PROGRESS':
        return '#000';
      case 'DONE':
        return '#FFF';
      default:
        return 'transparent';
    }
  }
}
