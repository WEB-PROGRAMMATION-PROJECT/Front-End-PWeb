import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StylisteSpaceComponent } from './styliste-space.component';

describe('StylisteSpaceComponent', () => {
  let component: StylisteSpaceComponent;
  let fixture: ComponentFixture<StylisteSpaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StylisteSpaceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StylisteSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
