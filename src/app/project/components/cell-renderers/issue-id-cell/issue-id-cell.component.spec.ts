import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueIdCellComponent } from './issue-id-cell.component';

describe('IssueIdCellComponent', () => {
  let component: IssueIdCellComponent;
  let fixture: ComponentFixture<IssueIdCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IssueIdCellComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IssueIdCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
