import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsContainerComponent } from './posts-container.component';
import { FormBuilder } from '@angular/forms';

describe('PostsContainerComponent', () => {
  let component: PostsContainerComponent;
  let fixture: ComponentFixture<PostsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostsContainerComponent],
      providers: [FormBuilder]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
