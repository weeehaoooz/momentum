import { Component, input, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'mom-select-option',
  imports: [],
  template: `<ng-template #templateRef><ng-content></ng-content></ng-template>`,
})
export class SelectOptionComponent {
  value = input<any>();
  label = input<string>('');
  @ViewChild('templateRef', { static: true }) template!: TemplateRef<unknown>;
}
