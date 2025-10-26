import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectNameEditorComponent } from './project-name-editor.component';

describe('ProjectNameEditorComponent', () => {
  let component: ProjectNameEditorComponent;
  let fixture: ComponentFixture<ProjectNameEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectNameEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectNameEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
