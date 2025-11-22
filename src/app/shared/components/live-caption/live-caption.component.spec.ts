import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveCaptionComponent } from './live-caption.component';

describe('LiveCaptionComponent', () => {
  let component: LiveCaptionComponent;
  let fixture: ComponentFixture<LiveCaptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiveCaptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiveCaptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
