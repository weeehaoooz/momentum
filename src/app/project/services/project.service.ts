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
    console.log(issuePayload);
    this.getProject(projectCode).subscribe({
      next: (project: any) => {
        const issues = project.issues;
        issues.push(issuePayload);
        project.count = project.count + 1;
        this.updateProject(projectCode, project);
      }
    })
  }


}
