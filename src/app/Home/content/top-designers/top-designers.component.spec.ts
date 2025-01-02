import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopDesignersComponent } from './top-designers.component';

describe('TopDesignersComponent', () => {
  let component: TopDesignersComponent;
  let fixture: ComponentFixture<TopDesignersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopDesignersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopDesignersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
