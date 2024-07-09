import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICategoria } from '../../../interfaces';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categorias-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './categorias-form.component.html',
  styleUrl: './categorias-form.component.scss'
})
export class CategoriasFormComponent {
  @Input() title: string = '';
  @Input() toUpdateGame: ICategoria = {};
  @Output() callParentEvent: EventEmitter<ICategoria> = new EventEmitter<ICategoria>();

  addEdit()  {
    this.callParentEvent.emit(this.toUpdateGame);
  }

}
