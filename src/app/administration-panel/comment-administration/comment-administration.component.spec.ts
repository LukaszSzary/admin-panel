import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentAdministrationComponent } from './comment-administration.component';

describe('CommentAdministrationComponent', () => {
  let component: CommentAdministrationComponent;
  let fixture: ComponentFixture<CommentAdministrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentAdministrationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentAdministrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
