import { Component, inject, input, signal, OnInit } from '@angular/core';
import { IProject, IProjectData } from '../../../services/projects.service';
import { IIssuePriorityEnum, IIssueStatusEnum } from '../../../project/components/issue-card/issue.interface';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { ProjectService } from '../../../project/services/project.service';

@Component({
  selector: 'mom-project-card',
  imports: [
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss'
})
export class ProjectCardComponent implements OnInit {
  router = inject(Router);
  projectService = inject(ProjectService);

  projectData = input<IProjectData>();
  project = signal<IProject | undefined>(undefined);

  ngOnInit() {
    const code = this.projectData()?.code ?? '';
    if (code) {
      this.projectService.getProject(code).subscribe((project) => {
        this.project.set(project as IProject);
      });
    }
  }

  totalIssues = () => this.project()?.issues.length ?? 0;

  remainingIssues = () =>
    this.project()?.issues.filter(issue =>
      issue.status === IIssueStatusEnum.TODO || issue.status === IIssueStatusEnum.IN_PROGRESS
    ).length ?? 0;

  highPriorityIssues = () =>
    this.project()?.issues.filter(issue => issue.priority === IIssuePriorityEnum.HIGH).length ?? 0;

  completionPercentage = () => {
    const issues = this.project()?.issues ?? [];
    if (issues.length === 0) return 0;
    const done = issues.filter(t => t.status === IIssueStatusEnum.DONE).length;
    return Math.round((done / issues.length) * 100);
  };

  redirectProject() {
    this.router.navigate([`/project/${this.project()?.code}`]);
  }

  editProject(event: MouseEvent) {
    event.stopPropagation();
  }
}
