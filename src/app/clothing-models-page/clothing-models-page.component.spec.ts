import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClothingModelsPageComponent } from './clothing-models-page.component';

describe('ClothingModelsPageComponent', () => {
  let component: ClothingModelsPageComponent;
  let fixture: ComponentFixture<ClothingModelsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClothingModelsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClothingModelsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
