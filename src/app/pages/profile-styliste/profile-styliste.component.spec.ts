import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileStylisteComponent } from './profile-styliste.component';

describe('ProfileStylisteComponent', () => {
  let component: ProfileStylisteComponent;
  let fixture: ComponentFixture<ProfileStylisteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileStylisteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileStylisteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
