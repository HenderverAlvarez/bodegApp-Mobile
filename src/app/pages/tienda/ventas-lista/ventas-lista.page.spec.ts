import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VentasListaPage } from './ventas-lista.page';

describe('VentasListaPage', () => {
  let component: VentasListaPage;
  let fixture: ComponentFixture<VentasListaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VentasListaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
