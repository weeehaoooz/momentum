import { inject, Injectable, signal } from '@angular/core';
import { ITask, ITaskPriorityEnum, ITaskStatusEnum } from '../components/task-card/task.interface';
import { ProjectsService } from './projects.service';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private projectService = inject(ProjectsService);
  
  createTask(projectId: string, task: ITask) {
    // const project = this.projectService.getProject(projectId);
    // if (project) {
    //   project.tasks.push(task);
    //   this.projectService.updateProject(projectId, project);
    // }
  }
}
