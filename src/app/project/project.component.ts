
import { Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { LayoutService } from '../shared/layout/main-layout/layout.service';
import { IIssueStatusEnum } from './components/issue-card/issue.interface';
import { ProjectNameEditorComponent } from "./components/project-name-editor/project-name-editor.component";
import { ProjectService } from './services/project.service';

@Component({
  selector: 'mom-project',
  imports: [
    MatIconModule,
    RouterOutlet,
    ProjectNameEditorComponent,
    MatButtonModule,
    MatTooltipModule
],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent {
  private readonly projectService = inject(ProjectService);
  private readonly layoutService = inject(LayoutService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  projectId = this.route.snapshot.paramMap.get('id') ?? null;
  project = this.projectService.project;
  assistMode = this.layoutService.assistMode;

  completionPercentage = computed(() => {
    if (!this.project()) return 0;
    const issues = this.project()?.issues ?? [];
    if (issues.length === 0) return 0;
    const done = issues.filter(t => t.status === IIssueStatusEnum.DONE).length;
    return Math.round((done / issues.length) * 100);
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

  toggleAssistMode() {
    this.layoutService.toggleAssistMode();
  }

  nameChange(name: string) {
    // const currentProject = this.project();
    // if (currentProject) {
    //   this.projectService.updateProject(this.projectId ?? '', { ...currentProject, name });
    // }
  }
}
