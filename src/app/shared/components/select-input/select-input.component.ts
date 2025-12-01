import { CommonModule } from '@angular/common';
import { Component, ContentChildren, effect, ElementRef, forwardRef, HostListener, input, QueryList, signal, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { SelectOptionComponent } from './select-option/select-option.component';

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
  isAbove = signal(false);

  @ContentChildren(SelectOptionComponent)
  options!: QueryList<SelectOptionComponent>;

  @ViewChild('trigger', { static: true })
  triggerEl!: ElementRef<HTMLElement>;

  @ViewChild('panel') 
  panelEl?: ElementRef<HTMLElement>;

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

  onTriggerKeydown(event: KeyboardEvent) {
    const key = event.key;

    // Open dropdown on Enter or Space
    if ((key === 'Enter' || key === ' ') && !this.isOpen()) {
      event.preventDefault();
      this.toggleOpen();
      return;
    }

    // Close dropdown on Escape
    if (key === 'Escape' && this.isOpen()) {
      event.preventDefault();
      this.isOpen.set(false);
      this.triggerEl.nativeElement.focus();
      return;
    }
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
    const viewportHeight = window.innerHeight;
    const panelHeight = this.panelEl?.nativeElement.offsetHeight ?? 200;
    const triggerHeight = this.triggerEl.nativeElement.offsetHeight;

    const spaceBelow = viewportHeight - rect.bottom;
    const spaceAbove = rect.top;

    const shouldOpenAbove = spaceBelow < panelHeight && spaceAbove > spaceBelow;
    this.isAbove.set(shouldOpenAbove);

    if (shouldOpenAbove) {
      // Position ABOVE (bottom of panel aligns with top of trigger)
      this.panelTop.set(rect.top + window.scrollY - panelHeight - triggerHeight - 8);
    } else {
      // Position BELOW (top of panel aligns with bottom of trigger)
      this.panelTop.set(rect.bottom + window.scrollY);
    }

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