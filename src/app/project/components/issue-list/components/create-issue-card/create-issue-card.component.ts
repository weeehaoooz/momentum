import { Component, input, output } from '@angular/core';
import { IProject } from '../../../../../services/projects.service';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { SelectInputComponent } from "../../../../../shared/components/select-input/select-input.component";
import { SelectOptionComponent } from "../../../../../shared/components/select-input/select-option/select-option.component";
import { IIssuePriorityEnum } from '../../../issue-card/issue.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'mom-create-issue-card',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    SelectInputComponent,
    SelectOptionComponent
  ],
  templateUrl: './create-issue-card.component.html',
  styleUrl: './create-issue-card.component.scss'
})
export class CreateIssueCardComponent {

  project = input<IProject | undefined>(undefined);
  close = output<any>();

  // derive select options from the enum so the UI always reflects the enum values
  // force descending order (highest first) while still deriving values from the enum
  private readonly _priorityOrder = ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW', 'MINIMAL', 'NONE'];
  private readonly _enumValues = (Object.values(IIssuePriorityEnum) as string[]).filter(v => typeof v === 'string');
  priorities = this._priorityOrder.filter(k => this._enumValues.includes(k));

  // map priority keys to colors (keeps UI colors synced with _colors.scss)
  private readonly _priorityColorMap: Record<string, string> = {
    CRITICAL: '#DE350B',
    HIGH: '#FFAB00',
    MEDIUM: '#2684FF',
    LOW: '#97A0AF',
    MINIMAL: '#E0E0E0',
    NONE: 'transparent'
  };

  // map priority keys to material icon names (descending severity -> up arrows)
  private readonly _priorityIconMap: Record<string, string> = {
    CRITICAL: 'keyboard_double_arrow_up',
    HIGH: 'keyboard_arrow_up',
    MEDIUM: 'equal',
    LOW: 'keyboard_arrow_down',
    MINIMAL: 'keyboard_double_arrow_down',
    NONE: 'remove' // fallback, will be hidden/neutral by styles if desired
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

  priorityColor(priority?: string) {
    if (!priority) return 'minimal';
    const key = String(priority).toUpperCase();
    return this._priorityColorMap[key] ?? 'minimal';
  }

  createIssue() {

  }

  closeEmitter() {
      this.close.emit("");
  }
}
