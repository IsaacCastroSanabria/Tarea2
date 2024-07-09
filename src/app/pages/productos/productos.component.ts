import { Component, OnInit, inject } from '@angular/core';
import { LoaderComponent } from '../../components/loader/loader.component';
import { ProductosListComponent } from '../../components/producto/productos-list/productos-list.component';
import { ProductosService } from '../../services/producto.service';
import { ModalComponent } from '../../components/modal/modal.component';
import { ProductosFormComponent } from '../../components/producto/productos-form/productos-form.component';
import { ICategoria } from '../../interfaces';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [
    LoaderComponent,
    ProductosListComponent,
    ModalComponent,
    ProductosFormComponent
  ],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.scss'
})
export class ProductosComponent implements OnInit{
  public productoService: ProductosService = inject(ProductosService);
  public categoriaService: CategoriaService = inject(CategoriaService);
  public modalService: NgbModal = inject(NgbModal);
  public route: ActivatedRoute = inject(ActivatedRoute);
  public authService: AuthService = inject(AuthService);
  public routeAuthorities: string[] = [];
  public areActionsAvailable: boolean = false;

  ngOnInit(): void {
    this.authService.getUserAuthorities();
    this.productoService.getAll();
    this.categoriaService.getAll();
    this.route.data.subscribe( data => {
      this.routeAuthorities = data['authorities'] ? data['authorities'] : [];
      this.areActionsAvailable = this.authService.areActionsAvailable(this.routeAuthorities);
    });
  }

  onFormEventCalled (params: ICategoria) {
    this.productoService.save(params);
    this.modalService.dismissAll();
  }
}
