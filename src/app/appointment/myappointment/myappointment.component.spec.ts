import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyappointmentComponent } from './myappointment.component';

describe('MyappointmentComponent', () => {
  let component: MyappointmentComponent;
  let fixture: ComponentFixture<MyappointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyappointmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyappointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
