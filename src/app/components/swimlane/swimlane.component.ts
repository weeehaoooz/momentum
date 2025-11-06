import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TitleCasePipe } from '@angular/common';
import { Component, computed, input, output, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { IIssue } from '../../project/components/issue-card/issue.interface';
import { ISwimlane } from './swimlane.interface';
import { IProject } from '../../services/projects.service';
import { IssueCardComponent } from '../../project/components/issue-card/issue-card.component';
import { CreateIssueCardComponent } from "../../project/components/issue-list/components/create-issue-card/create-issue-card.component";

@Component({
  selector: 'mom-swimlane',
  imports: [
    IssueCardComponent,
    TitleCasePipe,
    DragDropModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CreateIssueCardComponent
],
  templateUrl: './swimlane.component.html',
  styleUrl: './swimlane.component.scss'
})
export class SwimlaneComponent {
  project = input<IProject | undefined>();
  swimlane = input<ISwimlane>();
  connectedTo = input<string[]>([]);
  issueMoved = output<IIssue>();

  showNewIssueCard = signal<boolean>(false);

  critera = computed(() => this.swimlane()?.criteria);
  issues = computed(() => {
    const issues = this.swimlane()?.issues ?? [];
    const criteria = this.swimlane()?.criteria;
    return issues.filter(issue => issue?.status === criteria);
  });

  drop(event: CdkDragDrop<IIssue[]>) {
    const previousContainer = event.previousContainer;
    const currentContainer = event.container;

    if (event.previousContainer === event.container) {
      // Move within the same list
      moveItemInArray(this.issues(), event.previousIndex, event.currentIndex);
      return;
    } else {
      const movedIssue = previousContainer.data[event.previousIndex];
      const newStatus = this.swimlane()?.criteria ?? null;

      // Update task status based on destination swimlane
      movedIssue.status = newStatus;

      transferArrayItem(
        previousContainer.data,
        currentContainer.data,
        event.previousIndex,
        event.currentIndex
      );

      // Use .set() instead of .emit() for signal outputs
      this.issueMoved.emit(movedIssue);
    }
  }

  toggleNewIssueCard() {
    this.showNewIssueCard.set(!this.showNewIssueCard());
  }
}
