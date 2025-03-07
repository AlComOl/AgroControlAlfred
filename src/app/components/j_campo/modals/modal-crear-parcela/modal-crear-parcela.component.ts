import { Component, ViewChild, ElementRef, Renderer2, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ParcelaService } from '../../../../services/parcela.service';
import { Parcela } from '../../../../models/Parcela';

@Component({
  selector: 'app-modal-crear-parcela',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-crear-parcela.component.html',
  styleUrls: ['./modal-crear-parcela.component.css']
})
export class ModalCrearParcelaComponent implements OnInit {
  isVisible = false; // Controla la visibilidad del modal
  parcelas: Parcela[] = [];
  parcelaSeleccionada: any = [];  // Inicializado a null o un objeto vacío

  @ViewChild('modalElement') modalElement!: ElementRef;
  @Output() parcelaGuardada = new EventEmitter<Parcela>();  // Emite el tratamiento seleccionado al padre

  constructor(private rendered: Renderer2 ,private parcelaService: ParcelaService) {
  }

  ngOnInit(): void {
    this.parcelaService.getParcelasAll().subscribe(
      (data) => {
        this.parcelas = data;
      },
      (error) => {
        console.error('Error al obtener usuarios', error);
      }
    );
  }

  revisarParcelas(parcela: any) {
    const index = this.parcelaSeleccionada.indexOf(parcela);
    if (index === -1) {
      this.parcelaSeleccionada.push(parcela); // Lo agrega si no está
    } else {
      this.parcelaSeleccionada.splice(index, 1); // Lo quita si ya está
    }
  }


  // Mostrar modal usando clases de Bootstrap
  abrirModal() {
    this.isVisible = true;
    this.rendered.addClass(this.modalElement.nativeElement, 'show');
    this.rendered.setAttribute(this.modalElement.nativeElement, 'aria-hidden', 'false');
    this.rendered.setStyle(this.modalElement.nativeElement, 'display', 'block');
  }

  // Cerrar modal solo con el botón "X"
  cerrarModal() {
    this.isVisible = false;
    this.rendered.removeClass(this.modalElement.nativeElement, 'show');
    this.rendered.setAttribute(this.modalElement.nativeElement, 'aria-hidden', 'true');
    this.rendered.setStyle(this.modalElement.nativeElement, 'display', 'none');
  }

  // Guardar cambios y emitir el tratamiento seleccionado
  guardarCambios() {
    console.log('Emitiendo:', this.parcelaSeleccionada);  // Verifica el objeto completo
    this.parcelaGuardada.emit(this.parcelaSeleccionada);
    this.cerrarModal();
  }
  }

