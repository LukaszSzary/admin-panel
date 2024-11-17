import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostAdministrationComponent } from './post-administration.component';

describe('PostAdministrationComponent', () => {
  let component: PostAdministrationComponent;
  let fixture: ComponentFixture<PostAdministrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostAdministrationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostAdministrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
