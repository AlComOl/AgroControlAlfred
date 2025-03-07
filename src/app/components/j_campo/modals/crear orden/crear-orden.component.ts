import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ModalCrearTratamientoComponent } from '../modal-crear-tratamiento/modal-crear-tratamiento.component';
import { ModalCrearTareaComponent } from '../modal-crear-tarea/modal-crear-tarea.component';
import { ModalCrearFechaComponent } from '../modal-crear-fecha/modal-crear-fecha.component';
import { ModalCrearAplicadorComponent } from "../modal-crear-aplicador/modal-crear-aplicador.component";
import { ModalCrearParcelaComponent } from "../modal-crear-parcela/modal-crear-parcela.component";
import { ModalCrearMaquinaComponent } from "../modal-crear-maquina/modal-crear-maquina.component";

import { Parcela } from '../../../../models/Parcela';
import { User } from '../../../../models/User';
import { Maquina } from '../../../../models/Maquina';

import { OrdenesService } from '../../../../services/ordenes.service';


@Component({
  selector: 'app-crear-orden',
  standalone: true,
  imports: [CommonModule, ModalCrearTratamientoComponent, ModalCrearTareaComponent, ModalCrearFechaComponent, ModalCrearParcelaComponent, ModalCrearAplicadorComponent, ModalCrearMaquinaComponent], //Importamos el modal
  templateUrl: './crear-orden.component.html',
  styleUrls: ['./crear-orden.component.css']
})
export class CrearOrdenComponent{

  parcelaSeleccionada: any = null;
  tareaSeleccionada: any = null;
  aplicadoresSeleccionados: any[] = [];
  maquinaSeleccionada: any = null;
  tratamientoSeleccionado: any = null;
  fechaSeleccionada:string="";
  horaSeleccionada:string="";
  ventanaVisible = false; // Estado inicial oculto de la ventana de Orden creada

//Se usa ViewChild para referenciar el componente hijo y manipularlo desde el padre
//@ViewChild() es un decorador de Angular que permite al componente padre obtener una referencia a un elemento hijo dentro de su plantilla (.html). Puede ser usado para acceder a:
//Un elemento HTML directamente,Un componente hijo (como en este caso),Una directiva.
  // @ViewChild(ModalCrearTratamientoComponent) modalVerTarea!: ModalCrearTratamientoComponent;//  esto ! Angular se encargará de inicializar la variable más tarde, es decir, sabemos que la referencia existirá en tiempo de ejecución
  @ViewChild('modalVerParcelas') modalVerParcelas!: ModalCrearParcelaComponent;
  @ViewChild('modalVerAplicador') modalVerAplicador!: ModalCrearAplicadorComponent;
  @ViewChild('modalVerMaquina') modalVerMaquina!: ModalCrearMaquinaComponent;
  @ViewChild('modalVerTratamiento') modalVerTratamiento!: ModalCrearTratamientoComponent;
  @ViewChild('modalVerTarea') modalVerTarea!: ModalCrearTareaComponent;
  @ViewChild('modalVerFecha') modalVerFecha!: ModalCrearFechaComponent;


  constructor(private ordenesService: OrdenesService, private router: Router) {
    console.log("CrearOrdenComponent inicializado");
  }




recibirParcela(parcela: Parcela) {
  console.log('Recibido en el padre:', parcela);  // Verifica el objeto recibido
  this.parcelaSeleccionada = parcela;
}


recibirAplicador(aplicador: User | User[]) {

  console.log('Recibido en el padre:', aplicador);  // Verifica el objeto recibido
  this.aplicadoresSeleccionados = Array.isArray(aplicador) ? aplicador : [aplicador];


  console.log(this.aplicadoresSeleccionados)
}

recibirMaquina(maquina: any){
  console.log('Recibido en el padre:', maquina);
  this.maquinaSeleccionada = maquina;
}


//recibe el tratamiento del hijo y lo almacena
recibirTratamiento(tratamiento: any) {
  console.log('Recibido en el padre:', tratamiento);
  this.tratamientoSeleccionado = tratamiento;
}
recibirTarea(tarea: any) {
  console.log('Recibido en el padre:', tarea);
  this.tareaSeleccionada = tarea;
}

recibirFechaYHora(data: { fecha: string, hora: string }) {
  this.fechaSeleccionada = data.fecha;
  this.horaSeleccionada = data.hora;
  console.log('Fecha seleccionada:', this.fechaSeleccionada);
  console.log('Hora seleccionada:', this.horaSeleccionada);
}


abrirModalAplicador() {

  if (this.modalVerAplicador) {
    this.modalVerAplicador.abrirModal();
  } else {
    console.error('modalVerAplicador no está inicializado aún');
  }

}

abrirModalParcela() {
  if (this.modalVerParcelas) {
    this.modalVerParcelas.abrirModal();
  } else {
    console.error('modalVerParcelas no está inicializado aún');
  }
}



abrirModalMaquina() {
  if (this.modalVerMaquina) {
    this.modalVerMaquina.abrirModal();
  } else {
    console.error('modalVerParcelas no está inicializado aún');
  }
}

abrirModalTratamiento() {
  if (this.modalVerTratamiento) {
    this.modalVerTratamiento.abrirModal();
  } else {
    console.error('modalVerTratamiento no está inicializado aún');
  }
}

abrirModalTarea(){
  if (this.modalVerTarea) {
    this.modalVerTarea.abrirModal();
  } else {
    console.error('modalVerTarea no está inicializado aún');
  }
}

abrirModalFecha(){
  if (this.modalVerFecha) {
    this.modalVerFecha.abrirModal();
  } else {
    console.error('modalVerTarea no está inicializado aún');
  }
}

guardarDatos(){
  console.log('guardar datos');
  this.datosOrden();
  this.ventanaTareaCreada();

}


ventanaTareaCreada(){
  this.ventanaVisible = true; // Muestra la ventana
  setTimeout(() => {
    this.ventanaVisible = false; // La oculta después de 15 segundos
    this.router.navigate(['/dashboard']);
  }, 1000);
}


datosOrden(){
 let orden={
  parcela_id:this.parcelaSeleccionada.id || "",
  tarea:this.tareaSeleccionada ||"",
  aplicador_id:this.aplicadoresSeleccionados[0].id || "",
  estado:'pendiente',
  id_tratamiento:this.tratamientoSeleccionado.id || "",

 }
 console.log('Parcela id: ' + orden.parcela_id)
 console.log('Tarea asunto: ' + orden.tarea)
 console.log(orden.aplicador_id);

 this.ordenesService.enviarOrden(orden).subscribe({
  next: (response) => {
    console.log('Orden enviada correctamente:', response);
  },
  error: (error) => {
    console.error('Error al enviar la orden:', error);
  }
});
}





}
