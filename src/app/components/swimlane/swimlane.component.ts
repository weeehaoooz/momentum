import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TitleCasePipe } from '@angular/common';
import { Component, computed, input, output, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TaskCardComponent } from '../task-card/task-card.component';
import { IProjectTask, ITask } from '../task-card/task.interface';
import { SwimlaneCreateTaskCardComponent } from "./components/swimlane-create-task-card/swimlane-create-task-card.component";
import { ISwimlane } from './swimlane.interface';

@Component({
  selector: 'mom-swimlane',
  imports: [
    TaskCardComponent,
    TitleCasePipe,
    DragDropModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    SwimlaneCreateTaskCardComponent
  ],
  templateUrl: './swimlane.component.html',
  styleUrl: './swimlane.component.scss'
})
export class SwimlaneComponent {
  swimlane = input<ISwimlane>();
  connectedTo = input<string[]>([]);
  taskMoved = output<ITask>();

  showNewTaskCard = signal<boolean>(false);

  critera = computed(() => this.swimlane()?.criteria);
  tasks = computed(() => {
    const tasks = this.swimlane()?.tasks ?? [];
    const criteria = this.swimlane()?.criteria;
    return tasks.filter(task => task?.status === criteria);
  });

  // drop(event: CdkDragDrop<any>) {
  //   const movedTask = event.item.data;

  //   movedTask.status = this.swimlane()?.criteria ?? null;


  //   // Use .set() instead of .emit() for signal outputs
  //   this.taskMoved.emit({
  //     task: movedTask,
  //     prevSwimlaneId: event.previousContainer.id,
  //     nextSwimlaneId: event.container.id,
  //     currentIndex: event.previousIndex,
  //     updatedIndex: event.currentIndex
  //   });
  // }

  drop(event: CdkDragDrop<ITask[]>) {
    const previousContainer = event.previousContainer;
    const currentContainer = event.container;

    if (event.previousContainer === event.container) {
      // Move within the same list
      moveItemInArray(this.tasks(), event.previousIndex, event.currentIndex);
      return;
    } else {
      const movedTask = previousContainer.data[event.previousIndex];
      const newStatus = this.swimlane()?.criteria ?? null;

      // Update task status based on destination swimlane
      movedTask.status = newStatus;

      transferArrayItem(
        previousContainer.data,
        currentContainer.data,
        event.previousIndex,
        event.currentIndex
      );

      // Use .set() instead of .emit() for signal outputs
      this.taskMoved.emit(movedTask);
    }
  }

  toggleNewTaskCard() {
    this.showNewTaskCard.set(!this.showNewTaskCard());
  }
}
