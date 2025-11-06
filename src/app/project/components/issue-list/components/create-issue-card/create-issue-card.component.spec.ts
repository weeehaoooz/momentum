import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateIssueCardComponent } from './create-issue-card.component';

describe('CreateIssueCardComponent', () => {
  let component: CreateIssueCardComponent;
  let fixture: ComponentFixture<CreateIssueCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateIssueCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateIssueCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
