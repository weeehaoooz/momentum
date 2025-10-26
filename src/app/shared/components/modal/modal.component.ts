import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'mom-modal',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {

  backdrop = input<boolean>(true);
  full = input<boolean>(false);
  handleClose = output<any>();

  animationDelay = 0;

  constructor() {}

  closeModal() {
    this.handleClose.emit({});
  }
}
