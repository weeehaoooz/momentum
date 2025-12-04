import { inject, Injectable, signal } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';

@Injectable({
  providedIn: 'root'
})
export class IssueStatusService {
  private storageMap = inject(StorageMap);
  private readonly statusKey = 'issueStatus';

  // Signal to hold the statuses
  private issueStatuses = signal<Map<string, IIssueStatus>>(new Map());

  // Initialize the service by loading statuses
  constructor() {
    this.loadStatuses();
  }

  // Get all statuses
  getAllStatuses(): IIssueStatus[] {
    return Array.from(this.issueStatuses().values());
  }

  // Get a specific status by ID
  getStatusById(id: string): IIssueStatus | undefined {
    return this.issueStatuses().get(id);
  }

  // Create a new status
  createStatus(status: Omit<IIssueStatus, 'id'>): IIssueStatus {
    const newId = this.generateId();
    const newStatus: IIssueStatus = {
      ...status,
      id: newId
    };

    // Add to the map and save to storage
    const currentMap = this.issueStatuses();
    currentMap.set(newId, newStatus);
    this.issueStatuses.set(currentMap);
    this.saveStatuses();

    return newStatus;
  }

  // Delete a status by ID
  deleteStatus(id: string): boolean {
    const currentMap = this.issueStatuses();
    const deleted = currentMap.delete(id);

    if (deleted) {
      this.issueStatuses.set(currentMap);
      this.saveStatuses();
    }

    return deleted;
  }

  // Load statuses from storage
  private async loadStatuses(): Promise<void> {
    try {
      const savedStatuses = await this.storageMap.get(this.statusKey).toPromise();
      if (savedStatuses) {
        const map = new Map<string, IIssueStatus>();
        Object.entries(savedStatuses).forEach(([id, status]) => {
          map.set(id, status);
        });
        this.issueStatuses.set(map);
      }
    } catch (error) {
      console.error('Failed to load statuses from storage:', error);
    }
  }

  // Save statuses to storage
  private async saveStatuses(): Promise<void> {
    try {
      const statuses = Object.fromEntries(this.issueStatuses().entries());
      await this.storageMap.set(this.statusKey, statuses).toPromise();
    } catch (error) {
      console.error('Failed to save statuses to storage:', error);
    }
  }

  // Generate a simple ID (in a real app, you might want to use a more robust ID generation)
  private generateId(): string {
    return Math.random().toString(36).substring(2, 9);
  }
}


export interface IIssueStatus {
  id: string;
  name: string;
  color: string;
  backgroundColor: string;
}