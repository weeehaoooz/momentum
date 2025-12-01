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

  updateProject(project: IProject) {
    const projectCode = project.code;
    const projectStorageKey = 'STORAGE_' + projectCode;
    this.storagMap.set(projectStorageKey, project).subscribe({
      next: () => {
        this.project.set({...project});
        console.log("Project Updated in service");
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
        project.code = payload.projectCode;
        issuePayload.id = `${project.code}-${project.count}`;

        issues.push(issuePayload);
        this.updateProject(project);
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
        project.code = projectCode;
        this.updateProject(project);
      }
    })
  }

  deleteIssue(issueId: string | undefined) {
    // Find the project that contains this issue and remove it
    console.log(issueId);
    if (issueId) {
      const projectCode = issueId.split('-')[0]; // Assuming the format is PROJECT-COUNT
      this.getProject(projectCode).subscribe({
        next: (project: any) => {
          if (project && project.issues) {
            const issues = project.issues;
            const issueIndex = issues.findIndex((issue: any) => issue.id === issueId);

            if (issueIndex !== -1) {
              issues.splice(issueIndex, 1);
              this.updateProject(project);
            }
          }
        },
        error: (error) => {
          console.error('Error deleting issue:', error);
        }
      });
    }

  }
}
