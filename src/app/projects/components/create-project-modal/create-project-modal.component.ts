import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { ModalService } from '../../../shared/components/modal/modal.service';
import { IProject, ProjectsService } from '../../../services/projects.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'mom-create-project-modal',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ModalComponent
  ],
  templateUrl: './create-project-modal.component.html',
  styleUrl: './create-project-modal.component.scss'
})
export class CreateProjectModalComponent {
  private readonly modalService = inject(ModalService);
  private readonly projectService = inject(ProjectsService);

  projectForm!: FormGroup;

  ngOnInit() {
    this.projectForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(256)]),
      code: new FormControl('', [Validators.required, Validators.maxLength(5)]),
      description: new FormControl('')
    });
  }

  createProject() {
    if(this.projectForm.valid) {
      const project: IProject = {
        ...this.projectForm.value,
        swimlanes: [],
        issues: []
      };
      this.projectService.createProject(project);
      this.modalService.closeModal();
    }
  }

  closeModal() {
    console.log('closeModal');
    this.modalService.closeModal();
    this.projectForm.reset();
  }
}
