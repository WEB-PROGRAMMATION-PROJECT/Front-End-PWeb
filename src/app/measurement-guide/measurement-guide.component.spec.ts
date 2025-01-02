import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasurementGuideComponent } from './measurement-guide.component';

describe('MeasurementGuideComponent', () => {
  let component: MeasurementGuideComponent;
  let fixture: ComponentFixture<MeasurementGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeasurementGuideComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeasurementGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
