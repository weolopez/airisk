import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecaturWarComponent } from './decatur-war.component';

describe('DecaturWarComponent', () => {
  let component: DecaturWarComponent;
  let fixture: ComponentFixture<DecaturWarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DecaturWarComponent]
    });
    fixture = TestBed.createComponent(DecaturWarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
