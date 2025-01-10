import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StylisteOrdersComponent } from './styliste-orders.component';

describe('StylisteOrdersComponent', () => {
  let component: StylisteOrdersComponent;
  let fixture: ComponentFixture<StylisteOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StylisteOrdersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StylisteOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
