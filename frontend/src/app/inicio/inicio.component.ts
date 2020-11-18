import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MensajesService } from '../mensajes.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  @ViewChild('contMensajes') private contMensajes: ElementRef;

  public mensaje: string = '';
  public cargando: boolean = false;
  public carrera: any = null;
  
  lstMensajes:any[] = [{
    oracion: 'Hola! ¿en qué puedo ayudarle?',
    bot: true
  }]

  constructor(private mensajesService: MensajesService) { }

  ngOnInit(): void {
  }

  async enviar() {
    if (this.mensaje) {
      this.cargando = true;

      this.lstMensajes.push({
        oracion: this.mensaje,
        bot: false
      })

      this.mensajesService.post(this.mensaje).subscribe((res: any) => {
        // let respuesta = `Intención: ${res.intencion.intencion} (${res.intencion.probabilidad})\n`
        // respuesta += `Subintención: ${res.subintencion.subintencion} (${res.subintencion.probabilidad})\n`
        // respuesta += `Carrera: ${res.carrera.carrera} (${res.carrera.probabilidad})\n`

        this.lstMensajes.push({
          oracion: res.respuesta.respuesta,
          respuesta: res.respuesta,
          bot: true
        })

        this.cargando = false;
      }, (err) => {
        this.lstMensajes.push({
          oracion: 'Ups! algo falló al enviar tu consulta, puedes intentar de nuevo en otro momento.',
          bot: true
        })

        this.cargando = false;
      })

      this.mensaje = ''
    }
  }

  scrollToBottom(): void {
    try {
      this.contMensajes.nativeElement.scrollTop = this.contMensajes.nativeElement.scrollHeight;
    } catch (err) { }
  }

}
