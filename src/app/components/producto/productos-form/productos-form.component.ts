import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICategoria, IProducto } from '../../../interfaces';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-producto-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './productos-form.component.html',
  styleUrls: ['./productos-form.component.scss']
})
export class ProductosFormComponent {
  @Input() title: string = '';
  @Input() toUpdateGame: IProducto = { categoria: {} };
  @Output() callParentEvent: EventEmitter<IProducto> = new EventEmitter<IProducto>();
  @Input() itemListCat: ICategoria[] = [];

  addEdit()  {
    this.callParentEvent.emit(this.toUpdateGame);
  }

  onCategoryChange(selectedCategoryId: any) {
    const selectedCategory = this.itemListCat.find(cat => cat.id === parseInt(selectedCategoryId));
    if (selectedCategory) {
      this.toUpdateGame.categoria = selectedCategory;
    }
  }
  
}
