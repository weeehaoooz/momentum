import { Component, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IssueStatusService, IIssueStatus } from '../../services/issue-status.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ProjectViewNavComponent } from '../components/project-view-nav/project-view-nav.component';
import { ProjectService } from '../services/project.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'mom-settings',
  imports: [
    CommonModule,
    FormsModule,
    ProjectViewNavComponent,
    MatIconModule,
    MatButtonModule,
    RouterModule
],
  templateUrl: './settings.component.html',
  styleUrls: [
    './settings.component.scss',
    '../project-base.scss'
  ]
})
export class SettingsComponent implements OnInit {
  private readonly projectService = inject(ProjectService);

  project = this.projectService.project;
  projectId = computed(() => this.project()?.code ?? null);

  statuses: IIssueStatus[] = [];

  newName = '';
  newColor = '#000000';
  newBackground = '#ffffff';

  constructor(private issueStatusService: IssueStatusService) { }

  ngOnInit(): void {
    this.loadStatuses();
  }

  private loadStatuses(): void {
    this.statuses = this.issueStatusService.getAllStatuses();
  }

  addStatus(): void {
    const name = (this.newName ?? '').trim();
    if (!name) return;
    this.issueStatusService.createStatus({
      name,
      color: this.newColor,
      backgroundColor: this.newBackground
    });
    this.newName = '';
    this.newColor = '#000000';
    this.newBackground = '#ffffff';
    this.loadStatuses();
  }

  removeStatus(id: string): void {
    if (!confirm('Delete this status?')) return;
    const deleted = this.issueStatusService.deleteStatus(id);
    if (deleted) this.loadStatuses();
  }
}
