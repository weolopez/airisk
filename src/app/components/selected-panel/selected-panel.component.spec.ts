import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedPanelComponent } from './selected-panel.component';

describe('SelectedPanelComponent', () => {
  let component: SelectedPanelComponent;
  let fixture: ComponentFixture<SelectedPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectedPanelComponent]
    });
    fixture = TestBed.createComponent(SelectedPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
