import { Component, computed, inject, input } from '@angular/core';
import { IProject } from '../../../services/projects.service';
import { ITaskPriorityEnum, ITaskStatusEnum } from '../../../components/task-card/task.interface';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'mom-project-card',
  imports: [
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss'
})
export class ProjectCardComponent {
  router = inject(Router);

  project = input<IProject>();
  totalTasks = computed(() => this.project()?.tasks.length ?? 0);

  remainingTasks = computed(() =>
    this.project()?.tasks.filter(task =>
      task.status === ITaskStatusEnum.TODO || task.status === ITaskStatusEnum.IN_PROGRESS
    ).length ?? 0
  );

  highPriorityTasks = computed(() =>
    this.project()?.tasks.filter(task => task.priority === ITaskPriorityEnum.HIGH).length ?? 0
  );

  completionPercentage = computed(() => {
    const tasks = this.project()?.tasks ?? [];
    if (tasks.length === 0) return 0;
    const done = tasks.filter(t => t.status === ITaskStatusEnum.DONE).length;
    return Math.round((done / tasks.length) * 100);
  });

  redirectProject() {
    this.router.navigate([`/project/${this.project()?.code}`]);
  }

  editProject(event: MouseEvent) {
    event.stopPropagation();
  }
}
