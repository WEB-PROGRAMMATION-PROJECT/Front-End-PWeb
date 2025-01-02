import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClothingModelCardComponent } from './clothing-model-card.component';

describe('ClothingModelCardComponent', () => {
  let component: ClothingModelCardComponent;
  let fixture: ComponentFixture<ClothingModelCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClothingModelCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClothingModelCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
