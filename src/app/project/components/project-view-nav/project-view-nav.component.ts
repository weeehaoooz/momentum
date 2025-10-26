import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'mom-project-view-nav',
  imports: [
    RouterLink,
    RouterLinkActive,
    MatIconModule
  ],
  templateUrl: './project-view-nav.component.html',
  styleUrl: './project-view-nav.component.scss'
})
export class ProjectViewNavComponent {
  projectId = input<string | null>(null);
}
