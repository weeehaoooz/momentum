import { AfterViewInit, Component, computed, ContentChildren, effect, ElementRef, EmbeddedViewRef, forwardRef, HostListener, input, QueryList, signal, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectOptionComponent } from './select-option/select-option.component';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'mom-select-input',
  imports: [
    CommonModule,
    MatIconModule
  ],
  templateUrl: './select-input.component.html',
  styleUrl: './select-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectInputComponent),
      multi: true,
    },
  ],
})
export class SelectInputComponent implements ControlValueAccessor {
  label = input<string>(''); // Optional floating label
  placeholder = input('Select an option');
  isOpen = signal(false);
  value = signal<any>(null);

  @ContentChildren(SelectOptionComponent)
  options!: QueryList<SelectOptionComponent>;

  @ViewChild('trigger', { static: true })
  triggerEl!: ElementRef<HTMLElement>;

  @ViewChild('triggerContainer', { read: ViewContainerRef, static: true })
  triggerContainer!: ViewContainerRef;

  panelTop = signal(0);
  panelLeft = signal(0);
  panelWidth = signal(0);

  selectedLabel = signal('');
  selectedOptionTemplate: TemplateRef<any> | null = null;

  constructor() {
    effect(() => {
      if (!this.isOpen()) this.updateSelectedLabel();
    });
  }

  toggleOpen() {
    if (!this.isOpen()) this.setPanelPosition();
    this.isOpen.update((v) => !v);
    this.updateSelectedLabel();
  }

  private updateSelectedLabel() {
    this.triggerContainer?.clear();
    const match = this.options?.find(o => o.value() === this.value());
    if (!match) return;
    this.triggerContainer?.createEmbeddedView(match.template);
  }

  selectOption(option: SelectOptionComponent) {
    this.value.set(option.value());
    this.triggerContainer.createEmbeddedView(option.template);
    this.onChange(option.value());
    this.isOpen.set(false);
  }

  // --- ControlValueAccessor ---
  onChange: (v: any) => void = () => { };
  onTouched: () => void = () => { };

  writeValue(value: any): void {
    this.value.set(value);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  private setPanelPosition() {
    if (!this.triggerEl) return;
    const rect = this.triggerEl.nativeElement.getBoundingClientRect();
    this.panelTop.set(rect.bottom + window.scrollY);
    this.panelLeft.set(rect.left + window.scrollX);
    this.panelWidth.set(rect.width);
  }

  @HostListener('window:scroll')
  @HostListener('window:resize')
  onWindowChange() {
    if (this.isOpen()) this.setPanelPosition();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.triggerEl.nativeElement.contains(event.target as Node)) {
      this.isOpen.set(false);
    }
  }
}