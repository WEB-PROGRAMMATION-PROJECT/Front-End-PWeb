import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StylistModelsComponent } from './stylist-models.component';

describe('StylistModelsComponent', () => {
  let component: StylistModelsComponent;
  let fixture: ComponentFixture<StylistModelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StylistModelsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StylistModelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
