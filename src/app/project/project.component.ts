import { Component, computed, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { ProjectsService } from '../services/projects.service';
import { ITaskStatusEnum } from '../components/task-card/task.interface';
import { ProjectNameEditorComponent } from "./components/project-name-editor/project-name-editor.component";
import { ProjectService } from './services/project.service';

@Component({
  selector: 'mom-project',
  imports: [
    MatIconModule,
    RouterOutlet,
    ProjectNameEditorComponent
],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent {
  private readonly projectService = inject(ProjectService);
  private readonly route = inject(ActivatedRoute); 
  private readonly router = inject(Router);

  projectId = this.route.snapshot.paramMap.get('id') ?? null;
  project = this.projectService.project;

  completionPercentage = computed(() => {
    if (!this.project()) return 0;
    const tasks = this.project()?.tasks ?? [];
    if (tasks.length === 0) return 0;
    const done = tasks.filter(t => t.status === ITaskStatusEnum.DONE).length;
    return Math.round((done / tasks.length) * 100);
  });

  ngOnInit() {
    this.projectService.getProject(this.projectId ?? '').subscribe({
      next: (project: any) => {
        this.projectService.project.set(project);
      },
      error: () => {
        this.router.navigate(['/page-not-found']);          
      }
    });
  }
  
  nameChange(name: string) {
    // const currentProject = this.project();
    // if (currentProject) {
    //   this.projectService.updateProject(this.projectId ?? '', { ...currentProject, name });
    // }
  }
}
