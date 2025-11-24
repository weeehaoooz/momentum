import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueStatusCellComponent } from './issue-status-cell.component';

describe('IssueStatusCellComponent', () => {
  let component: IssueStatusCellComponent;
  let fixture: ComponentFixture<IssueStatusCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IssueStatusCellComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IssueStatusCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
