import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderPages } from './header.pages';

describe('HeaderPages', () => {
  let component: HeaderPages;
  let fixture: ComponentFixture<HeaderPages>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderPages ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderPages);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
