import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondnutritionComponent } from './secondnutrition.component';

describe('SecondnutritionComponent', () => {
  let component: SecondnutritionComponent;
  let fixture: ComponentFixture<SecondnutritionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SecondnutritionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SecondnutritionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
