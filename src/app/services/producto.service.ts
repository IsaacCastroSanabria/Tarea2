import { Injectable, inject, signal } from '@angular/core';
import { BaseService } from './base-service';
import { IProducto } from '../interfaces';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ProductosService extends BaseService<IProducto>{
  protected override source: string = 'productos';
  private itemListSignal = signal<IProducto[]>([]);
  private snackBar = inject(MatSnackBar);
  
  get items$() {
    return this.itemListSignal
  }

  public getAll() {
    this.findAll().subscribe({
      next: (response: any) => {
        response.reverse();
        this.itemListSignal.set(response);
      },
      error: (error : any) => {
        console.log('error', error);
      }
    });
  }

  public save(item: IProducto) {
    this.add(item).subscribe({
      next: (response: any) => {
        this.itemListSignal.update((productos: IProducto[]) => [response, ...productos]);
      },
      error: (error : any) => {
        this.snackBar.open(error.error.description, 'Close', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
        console.error('error', error);
        console.error('error', error);
      }
    })
  }  

  public update(item: IProducto) {
    this.edit(item.id, item).subscribe({
      next: () => {
        const updatedItems = this.itemListSignal().map(categoria => categoria.id === item.id ? item : categoria);
        this.itemListSignal.set(updatedItems);
      },
      error: (error : any) => {
        this.snackBar.open(error.error.description, 'Close', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
        console.error('error', error);
        console.error('error', error);
      }
    })
  }
  
  public delete(game: IProducto) {
    this.del(game.id).subscribe({
      next: () => {
        const updatedItems = this.itemListSignal().filter((g: IProducto) => g.id != game.id);
        this.itemListSignal.set(updatedItems);
      },
      error: (error : any) => {
        this.snackBar.open(error.error.description, 'Close', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
        console.error('error', error);
      }
    })
  }


}
