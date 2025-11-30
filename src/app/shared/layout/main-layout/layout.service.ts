import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  assistMode = signal<boolean>(false);

  toggleAssistMode() {
    this.assistMode.update((mode) => !mode);
  }
}
