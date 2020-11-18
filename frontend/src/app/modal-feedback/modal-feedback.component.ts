import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { MensajesService } from '../mensajes.service';

@Component({
  selector: 'app-modal-feedback',
  templateUrl: './modal-feedback.component.html',
  styleUrls: ['./modal-feedback.component.css'],
})
export class ModalFeedbackComponent implements OnInit {
  oracion: string = '';
  intencion: string = 'charla';
  subintencion: string = 'todas';
  carrera: string = 'todas';
  w5: string = 'todas';

  constructor(
    public bsModalRef: BsModalRef,
    private mensajesService: MensajesService
  ) {}

  ngOnInit(): void {}

  init = (respuesta) => {
    this.oracion = respuesta.oracion;
    this.intencion = respuesta.intencion;
    this.subintencion = respuesta.subintencion;
    this.carrera = respuesta.carrera;
    this.w5 = respuesta.w5;
  };

  guardar() {
    let params = {
      oracion: this.oracion,
      intecion: this.intencion,
      subintencion: this.subintencion,
      carrera: this.carrera,
      w5: this.w5,
    };

    this.mensajesService.feedback(params);

    this.bsModalRef.hide();
  }
}
