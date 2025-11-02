import { inject, Injectable, signal } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { IProject } from '../../services/projects.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private storagMap = inject(StorageMap);

  project = signal<IProject | undefined>(undefined);
  constructor() { }

  getProject(projectCode: string) {
    const projectStorageKey = 'STORAGE_'+projectCode
    return this.storagMap.get(projectStorageKey);
  }
}
