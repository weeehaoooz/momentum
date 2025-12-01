import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueLineComponent } from './issue-line.component';

describe('IssueLineComponent', () => {
  let component: IssueLineComponent;
  let fixture: ComponentFixture<IssueLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IssueLineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IssueLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
