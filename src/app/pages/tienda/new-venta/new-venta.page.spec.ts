import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewVentaPage } from './new-venta.page';

describe('NewVentaPage', () => {
  let component: NewVentaPage;
  let fixture: ComponentFixture<NewVentaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NewVentaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
