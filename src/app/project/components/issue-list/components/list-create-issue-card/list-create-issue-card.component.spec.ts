import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCreateIssueCardComponent } from './list-create-issue-card.component';

describe('ListCreateIssueCardComponent', () => {
  let component: ListCreateIssueCardComponent;
  let fixture: ComponentFixture<ListCreateIssueCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListCreateIssueCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCreateIssueCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
