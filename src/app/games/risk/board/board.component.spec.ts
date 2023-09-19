import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskBoardComponent } from './board.component';

describe('BoardComponent', () => {
  let component: RiskBoardComponent;
  let fixture: ComponentFixture<RiskBoardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RiskBoardComponent]
    });
    fixture = TestBed.createComponent(RiskBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
