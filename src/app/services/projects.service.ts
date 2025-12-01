import { inject, Injectable, signal } from '@angular/core';
import { ISwimlane } from '../project/components/swimlane/swimlane.interface';
import { IIssue, IIssuePriorityEnum, IIssueStatusEnum } from '../project/components/issue-card/issue.interface';
import { StorageMap } from '@ngx-pwa/local-storage';

const PROJECTS_STORAGE_KEY = 'momentum:projects';
const STORAGE_CURRENT_KEY = 'momentum:currentProjectCode';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private storage = inject(StorageMap);

  projects = signal<Map<string, IProjectData>>(new Map());
  currentProject = signal<IProject | undefined>(undefined);

  constructor() {
    if (this.projects().size === 0) {
      this.storage.get(PROJECTS_STORAGE_KEY).subscribe({
        next: projects => {
          if (projects) {
            const projectMap = new Map<string, IProjectData>();
            Object.entries(projects).forEach(([key, value]) => projectMap.set(key, value as IProjectData));
            this.projects.set(projectMap);
          }
        },
        error: error => {
          console.error(error);
        }
      });
    }
  }

  hasProject(projectId: string) {
    const projectStorageKey = 'STORAGE_' + projectId
    this.storage.get(projectStorageKey).subscribe({
      next: () => {
        return true;
      },
      error: () => {
        return false
      }
    })
  }

  createProject(project: IProject) {
    // Creating Project in projects Map
    const order = this.projects().size
    const projectData: IProjectData = {
      code: project.code,
      name: project.name,
      description: project.description,
      order: order,
      totalIssues: project.issues.length,
      remainingIssues: project.issues.filter(issue => issue.status === IIssueStatusEnum.TODO || issue.status === IIssueStatusEnum.IN_PROGRESS).length,
      highPriorityIssues: project.issues.filter(issue => issue.priority === IIssuePriorityEnum.HIGH).length
    }
    const projects = this.projects().set(project.code, projectData);
    this.projects.set(new Map(projects));
    this.persistProjects();

    // Creating Project under it's own key
    const projectStorageKey = 'STORAGE_' + project.code
    // Setting defaults
    project = {
      ...project,
      count: 0,
    }
    this.storage.set(projectStorageKey, project).subscribe({
      next: () => {
        console.log("project created successfully");
      }, error: error => {
        console.error(error);
      }
    });
  }

  // Persist the projects Map into local storage
  persistProjects(): void {
    try {
      const map = this.projects();
      // convert Map -> plain object { code: IProjectData, ... }
      const plain = Object.fromEntries(Array.from(map.entries()));
      this.storage.set(PROJECTS_STORAGE_KEY, plain).subscribe({
        next: () => {
          console.log('Projects persisted to storage');
        },
        error: (err) => {
          console.error('Failed to persist projects', err);
        }
      });
    } catch (err) {
      console.error('persistProjects error', err);
    }
  }
}

export interface IProject {
  name: string;
  code: string;
  description: string;
  count: number;
  progress: number;
  swimlanes: ISwimlane[];
  issues: IIssue[];
}

export interface IProjectData {
  code: string,
  name: string,
  description: string,
  order: number,
  totalIssues: number,
  remainingIssues: number,
  highPriorityIssues: number
}