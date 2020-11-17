import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { InicioComponent } from './inicio/inicio.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MensajeComponent } from './mensaje/mensaje.component';
import { FormsModule } from '@angular/forms';
import { MensajesService } from './mensajes.service'
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalFeedbackComponent } from './modal-feedback/modal-feedback.component';

@NgModule({
  declarations: [
    InicioComponent,
    MensajeComponent,
    ModalFeedbackComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ModalModule.forRoot()
  ],
  providers: [
    MensajesService
  ],
  bootstrap: [InicioComponent]
})
export class AppModule { }
