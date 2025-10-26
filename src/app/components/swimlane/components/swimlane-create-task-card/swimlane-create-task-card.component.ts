import { Component, output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'mom-swimlane-create-task-card',
  imports: [
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './swimlane-create-task-card.component.html',
  styleUrl: './swimlane-create-task-card.component.scss'
})
export class SwimlaneCreateTaskCardComponent {

  close = output<boolean>();

  toggleNewTaskCard() {
    this.close.emit(true);
  }
}
