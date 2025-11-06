import { Injectable, signal } from '@angular/core';
import { ISwimlane } from '../components/swimlane/swimlane.interface';
import { IIssueStatusEnum } from '../project/components/issue-card/issue.interface';

@Injectable({
  providedIn: 'root'
})
export class SwimlanesService {
  
  swimlanes = signal<ISwimlane[]>([]);

  private sampleSwimlanes = [
    {
      id: "todo",
      title: 'To Do',
      criteria: IIssueStatusEnum.TODO
    },
    {
      id: "in-progress",
      title: 'In Progress',
      criteria: IIssueStatusEnum.IN_PROGRESS
    },
    {
      id: "done",
      title: 'Done',
      criteria: IIssueStatusEnum.DONE
    }
  ] as ISwimlane[];
  
  constructor() {
    this.swimlanes.set(this.sampleSwimlanes);
  }
}
