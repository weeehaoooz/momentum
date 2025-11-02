import { Component, inject, input, signal, OnInit } from '@angular/core';
import { IProject, IProjectData } from '../../../services/projects.service';
import { ITaskPriorityEnum, ITaskStatusEnum } from '../../../components/task-card/task.interface';
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

  totalTasks = () => this.project()?.tasks.length ?? 0;

  remainingTasks = () =>
    this.project()?.tasks.filter(task =>
      task.status === ITaskStatusEnum.TODO || task.status === ITaskStatusEnum.IN_PROGRESS
    ).length ?? 0;

  highPriorityTasks = () =>
    this.project()?.tasks.filter(task => task.priority === ITaskPriorityEnum.HIGH).length ?? 0;

  completionPercentage = () => {
    const tasks = this.project()?.tasks ?? [];
    if (tasks.length === 0) return 0;
    const done = tasks.filter(t => t.status === ITaskStatusEnum.DONE).length;
    return Math.round((done / tasks.length) * 100);
  };

  redirectProject() {
    this.router.navigate([`/project/${this.project()?.code}`]);
  }

  editProject(event: MouseEvent) {
    event.stopPropagation();
  }
}
