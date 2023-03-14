import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioTransaccionesComponent } from './formulario-transacciones.component';

describe('FormularioTransaccionesComponent', () => {
  let component: FormularioTransaccionesComponent;
  let fixture: ComponentFixture<FormularioTransaccionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioTransaccionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioTransaccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
