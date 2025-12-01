import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IssueStatusService {
  
  issueStatuses = signal<Map<string, IIssueStatus>>(new Map());

  constructor() {
    
  }
}


export interface IIssueStatus {
  id: string;
  name: string;
  color: string;
  backgroundColor: string;
}