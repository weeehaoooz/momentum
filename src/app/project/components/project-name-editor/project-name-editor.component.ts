
import { Component, ViewChild, ElementRef, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IProject } from '../../../services/projects.service';
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'mom-project-name-editor',
  imports: [
    FormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
],
  templateUrl: './project-name-editor.component.html',
  styleUrls: ['./project-name-editor.component.scss'],
  standalone: true
})
export class ProjectNameEditorComponent {
  
  project = input<IProject | undefined>( undefined );
  nameChange = output<string>();

  editMode = false;
  localName = '';

  @ViewChild('nameInput') nameInput?: ElementRef<HTMLInputElement>;

  toggleEdit() {
    this.editMode = !this.editMode;

    if (this.editMode) {
      // initialize from the signal value
      this.localName = this.project?.()?.name ?? '';

      // defer focus/select to next tick to avoid ExpressionChangedAfterItHasBeenCheckedError
      setTimeout(() => {
        try {
          this.nameInput?.nativeElement.focus();
          this.nameInput?.nativeElement.select();
        } catch {
          // ignore if element isn't available
        }
      });
    }
  }

  save() {
    const newName = (this.localName ?? '').trim();
    if (newName && newName !== (this.project?.()?.name ?? '')) {
      this.nameChange.emit(newName);
    }
    this.editMode = false;
  }

  cancel() {
    this.editMode = false;
    this.localName = this.project?.()?.name ?? '';
  }
}
