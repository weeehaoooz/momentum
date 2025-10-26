import { Component, input } from '@angular/core';
import { ITask } from './task.interface';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'mom-task-card',
  imports: [
    CommonModule,
    TitleCasePipe,
    MatIconModule
  ],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss'
})
export class TaskCardComponent {

  task = input<ITask>();

  toggleNewTaskCard() {
    
  }
}
