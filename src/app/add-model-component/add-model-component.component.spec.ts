import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddModelComponentComponent } from './add-model-component.component';

describe('AddModelComponentComponent', () => {
  let component: AddModelComponentComponent;
  let fixture: ComponentFixture<AddModelComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddModelComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddModelComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
