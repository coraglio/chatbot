import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { MensajesService } from '../mensajes.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ModalFeedbackComponent } from '../modal-feedback/modal-feedback.component';

@Component({
  selector: 'app-mensaje',
  templateUrl: './mensaje.component.html',
  styleUrls: ['./mensaje.component.css']
})
export class MensajeComponent implements OnInit, OnChanges {
  @Input() mensaje = null;
  showButtons: boolean = false;
  bsModalRef: BsModalRef;

  constructor(private mensajesService: MensajesService, private modalService: BsModalService) { }

  ngOnInit(): void {

  }

  ngOnChanges() {
    this.showButtons = this.mensaje.bot && this.mensaje.respuesta;
  }

  clickUp() {
    this.showButtons = false;

    let params = {
      oracion: this.mensaje.respuesta.oracion,
      intecion: this.mensaje.intencion.intencion,
      subintencion: this.mensaje.subintencion.subintencion,
      carrera: this.mensaje.carrera.carrera,
      w5: this.mensaje.w5.w5
    }

    this.mensajesService.feedback(params);
  }

  clickDown() {
    this.showButtons = false;

    this.bsModalRef = this.modalService.show(ModalFeedbackComponent, {
      class: "modal-lg",
      backdrop: "static",
      ignoreBackdropClick: true,
      keyboard: false
    });
    this.bsModalRef.content.oracion = this.mensaje.oracion
    this.bsModalRef.content.intecion = this.mensaje.intecion.intencion
    this.bsModalRef.content.subintecion = this.mensaje.subintecion.subintecion
    this.bsModalRef.content.carrera = this.mensaje.carrera.carrera
    this.bsModalRef.content.w5 = this.mensaje.w5.w5

  }

}
