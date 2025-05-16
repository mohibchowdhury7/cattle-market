import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCattleComponent } from './add-cattle.component';

describe('AddCattleComponent', () => {
  let component: AddCattleComponent;
  let fixture: ComponentFixture<AddCattleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCattleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCattleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
