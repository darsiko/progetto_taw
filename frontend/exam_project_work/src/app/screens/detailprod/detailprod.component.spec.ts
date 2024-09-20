import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailprodComponent } from './detailprod.component';

describe('DetailprodComponent', () => {
  let component: DetailprodComponent;
  let fixture: ComponentFixture<DetailprodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailprodComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailprodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
