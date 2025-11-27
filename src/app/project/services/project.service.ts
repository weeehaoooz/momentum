import { inject, Injectable, signal } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { IProject, ProjectsService } from '../../services/projects.service';
import { IIssue } from '../components/issue-card/issue.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projectsService = inject(ProjectsService);
  private storagMap = inject(StorageMap);

  project = signal<IProject | undefined>(undefined);
  constructor() { }

  getProject(projectCode: string) {
    const projectStorageKey = 'STORAGE_' + projectCode
    return this.storagMap.get(projectStorageKey);
  }

  refreshProject(projectCode: string) {
    this.getProject(projectCode).subscribe({
      next: (project: any) => {
        this.project.set(project);
      }
    })
  }

  updateProject(projectCode: string, project: IProject) {
    const projectStorageKey = 'STORAGE_' + projectCode;
    this.storagMap.set(projectStorageKey, project).subscribe({
      next: () => {
        this.refreshProject(projectCode);
        console.log("issue created successfully");
      },
      error: error => {
        console.error(error);
      }
    });
  }

  createIssue(payload: any) {
    const projectCode = payload.projectCode;
    const issuePayload = payload.issue;

    this.getProject(projectCode).subscribe({
      next: (project: any) => {
        const issues = project.issues;

        // Generate ID
        project.count = (project.count || 0) + 1;
        issuePayload.id = `${projectCode}-${project.count}`;

        issues.push(issuePayload);
        this.updateProject(projectCode, project);
      }
    })
  }

  createIssues(payload: { projectCode: string, issues: any[] }) {
    const projectCode = payload.projectCode;
    const newIssues = payload.issues;

    this.getProject(projectCode).subscribe({
      next: (project: any) => {
        const issues = project.issues;
        let currentCount = project.count || 0;

        newIssues.forEach(issue => {
          currentCount++;
          issue.id = `${projectCode}-${currentCount}`;
        });

        issues.push(...newIssues);
        project.count = currentCount;
        this.updateProject(projectCode, project);
      }
    })
  }
}
