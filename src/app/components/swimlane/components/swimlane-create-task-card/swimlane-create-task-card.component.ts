import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, input, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ITaskPriorityEnum } from '../../../task-card/task.interface';
import { IProject } from '../../../../services/projects.service';
import { ISwimlane } from '../../swimlane.interface';
import { TasksService } from '../../../../services/tasks.service';

@Component({
  selector: 'mom-swimlane-create-task-card',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule
  ],
  templateUrl: './swimlane-create-task-card.component.html',
  styleUrls: ['./swimlane-create-task-card.component.scss']
})
export class SwimlaneCreateTaskCardComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private tasksService = inject(TasksService);

  // derive select options from the enum so the UI always reflects the enum values
  // force descending order (highest first) while still deriving values from the enum
  private readonly _priorityOrder = ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW', 'MINIMAL', 'NONE'];
  private readonly _enumValues = (Object.values(ITaskPriorityEnum) as string[]).filter(v => typeof v === 'string');
  priorities = this._priorityOrder.filter(k => this._enumValues.includes(k));

  project = input<IProject>();
  swimlane = input<ISwimlane>();
  close = output<any>();
  taskForm!: FormGroup; // Reactive form group

  // map priority keys to colors (keeps UI colors synced with _colors.scss)
  private readonly _priorityColorMap: Record<string, string> = {
    CRITICAL: '#DE350B',
    HIGH:     '#FFAB00',
    MEDIUM:   '#2684FF',
    LOW:      '#97A0AF',
    MINIMAL:  '#E0E0E0',
    NONE:     'transparent'
  };

  // map priority keys to material icon names (descending severity -> up arrows)
  private readonly _priorityIconMap: Record<string, string> = {
    CRITICAL: 'keyboard_double_arrow_up',
    HIGH:     'keyboard_arrow_up',
    MEDIUM:   'equal',
    LOW:      'keyboard_arrow_down',
    MINIMAL:  'keyboard_double_arrow_down',
    NONE:     'remove' // fallback, will be hidden/neutral by styles if desired
  };

  /** return the mat-icon name to use for a priority */
  priorityIcon(priority?: string) {
    if (!priority) return this._priorityIconMap['None'];
    const key = String(priority).toUpperCase();
    return this._priorityIconMap[key] ?? this._priorityIconMap['NONE'];
  }

  /** return a color for the icon (same as dot color) */
  priorityIconColor(priority?: string) {
    const c = this.priorityColor(priority);
    // return transparent for NONE so icon can be hidden or neutral
    return c === 'transparent' ? '' : c;
  }

  ngOnInit() {
    this.taskForm = this.formBuilder.group({
      message: ['', [Validators.required, Validators.maxLength(256)]],
      description: [''],
      priority: [this.swimlane?.()?.criteria ?? ITaskPriorityEnum.MINIMAL],
      dueDate: [null]
    });
  }

  toggleNewTaskCard() {
    // reset and ensure priority defaults to swimlane priority (if provided)
    this.taskForm.reset({
      priority: this.swimlane?.()?.criteria ?? ITaskPriorityEnum.MINIMAL,
      message: '',
      description: '',
      dueDate: null
    });
    this.close.emit("");
  }

  createTask() {
    const projectId = this.project()?.code;
    const swimlaneVal = this.swimlane?.();
    if (this.taskForm.valid && projectId && swimlaneVal) {
      const newTask = {
        id: Math.random().toString(36).substring(2, 9),
        title: this.taskForm.value.message,
        description: this.taskForm.value.description,
        swimlaneId: swimlaneVal.id,
        status: swimlaneVal.criteria,
        priority: this.taskForm.value.priority ?? (swimlaneVal.criteria ?? ITaskPriorityEnum.MINIMAL),
        dueDate: this.taskForm.value.dueDate ?? null
      } as any;

      this.tasksService.createTask(projectId, newTask);
      // this.resetForm();
    }
  }

  resetForm() {
    this.taskForm.reset({
      priority: this.swimlane?.()?.criteria ?? ITaskPriorityEnum.MINIMAL,
      message: '',
      description: '',
      dueDate: null
    });
  }

  priorityColor(priority?: string) {
    if (!priority) return 'minimal';
    const key = String(priority).toUpperCase();
    return this._priorityColorMap[key] ?? 'minimal';
  }

  // return the color to use for the card border based on current form selection or swimlane default
  borderColor(): string {
    const formPriority = this.taskForm?.get('priority')?.value;
    if (formPriority) return this.priorityColor(formPriority);
    const swimlanePriority = this.swimlane?.()?.criteria;
    if (swimlanePriority) return this.priorityColor(swimlanePriority);
    return this._priorityColorMap['MINIMAL'];
  }
}
