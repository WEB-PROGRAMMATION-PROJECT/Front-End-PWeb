import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StylisteProfileComponent } from './styliste-profile.component';

describe('StylisteProfileComponent', () => {
  let component: StylisteProfileComponent;
  let fixture: ComponentFixture<StylisteProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StylisteProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StylisteProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
