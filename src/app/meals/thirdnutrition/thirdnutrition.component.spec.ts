import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdnutritionComponent } from './thirdnutrition.component';

describe('ThirdnutritionComponent', () => {
  let component: ThirdnutritionComponent;
  let fixture: ComponentFixture<ThirdnutritionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThirdnutritionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ThirdnutritionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
