import { Component, input } from '@angular/core';
import { IProject } from '../../../../../services/projects.service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'mom-list-create-issue-card',
  imports: [
    CommonModule,
    MatIconModule
  ],
  templateUrl: './list-create-issue-card.component.html',
  styleUrl: './list-create-issue-card.component.scss'
})
export class ListCreateIssueCardComponent {

  project = input<IProject | undefined >(undefined);

  
}
