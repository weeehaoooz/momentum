import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechToTextButtonComponent } from './speech-to-text-button.component';

describe('SpeechToTextButtonComponent', () => {
  let component: SpeechToTextButtonComponent;
  let fixture: ComponentFixture<SpeechToTextButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpeechToTextButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpeechToTextButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
