import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignersPageComponent } from './designers-page.component';

describe('DesignersPageComponent', () => {
  let component: DesignersPageComponent;
  let fixture: ComponentFixture<DesignersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesignersPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesignersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
