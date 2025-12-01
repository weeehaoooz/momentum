import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { IIssue } from '../../../issue-card/issue.interface';

@Component({
  selector: 'mom-issue-line',
  imports: [
    CommonModule,
    MatIconModule,
  ],
  templateUrl: './issue-line.component.html',
  styleUrl: './issue-line.component.scss'
})
export class IssueLineComponent {

  issue = input<IIssue>();

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
}
