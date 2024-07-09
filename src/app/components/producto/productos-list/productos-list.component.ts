import { ProductosService } from '../../../services/producto.service';
import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { ICategoria, IProducto } from '../../../interfaces';
import { CommonModule } from '@angular/common';
import { ModalComponent } from "../../modal/modal.component";
import { ProductosFormComponent } from '../productos-form/productos-form.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-productos-list',
  standalone: true,
  templateUrl: './productos-list.component.html',
  styleUrl: './productos-list.component.scss',
  imports: [
    CommonModule,
    ModalComponent,
    ProductosFormComponent
  ], 
})
export class ProductosListComponent {
  @Input() itemList: IProducto[] = [];
  @Input() itemListCat: ICategoria[] = [];
  @Input() areActionsAvailable: boolean = false;
  public selectedItem: IProducto = {};
  private productoService = inject(ProductosService);
  public modalService = inject(NgbModal);

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['areActionsAvailable']) {
      console.log('areActionsAvailable', this.areActionsAvailable);
    }
  }

  showDetailModal(item: IProducto, modal:any) {
    this.selectedItem = {...item}; 
    modal.show(); 
  }
  
  onFormEventCalled (params: IProducto) {
    this.productoService.update(params);
    this.modalService.dismissAll();
  }

  deleteProducto(producto: IProducto) {
    this.productoService.delete(producto);
  }

}
