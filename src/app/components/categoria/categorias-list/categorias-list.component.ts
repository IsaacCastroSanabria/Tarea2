import { CategoriaService } from '../../../services/categoria.service';
import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { ICategoria } from '../../../interfaces';
import { CommonModule } from '@angular/common';
import { ModalComponent } from "../../modal/modal.component";
import { CategoriasFormComponent } from '../categorias-form/categorias-form.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-categorias-list',
  standalone: true,
  templateUrl: './categorias-list.component.html',
  styleUrl: './categorias-list.component.scss',
  imports: [
    CommonModule,
    ModalComponent,
    CategoriasFormComponent
  ], 
})
export class CategoriasListComponent {
  @Input() itemList: ICategoria[] = [];
  @Input() areActionsAvailable: boolean = false;
  public selectedItem: ICategoria = {};
  private categoriaService = inject(CategoriaService);
  public modalService = inject(NgbModal);

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['areActionsAvailable']) {
      console.log('areActionsAvailable', this.areActionsAvailable);
    }
    console.log(this.itemList);
  }

  showDetailModal(item: ICategoria, modal:any) {
    this.selectedItem = {...item}; 
    modal.show(); 
  }
  
  onFormEventCalled (params: ICategoria) {
    this.categoriaService.update(params);
    this.modalService.dismissAll();
  }

  deleteCategoria(categoria: ICategoria) {
    this.categoriaService.delete(categoria);
  }

}
