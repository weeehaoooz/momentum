import { Injectable } from '@angular/core';
import { IIssue } from '../project/components/issue-card/issue.interface';

@Injectable({
  providedIn: 'root'
})
export class IssuesService {
  
  createIssue(projectId: string, newIssue: IIssue) {

  }
}
