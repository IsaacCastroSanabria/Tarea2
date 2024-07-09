import { Injectable, inject, signal } from '@angular/core';
import { BaseService } from './base-service';
import { ICategoria } from '../interfaces';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService extends BaseService<ICategoria>{
  protected override source: string = 'categorias';
  private itemListSignal = signal<ICategoria[]>([]);
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

  public save(item: ICategoria) {
    this.add(item).subscribe({
      next: (response: any) => {
        this.itemListSignal.update((categorias: ICategoria[]) => [response, ...categorias]);
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

  public update(item: ICategoria) {
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
  
  public delete(game: ICategoria) {
    this.del(game.id).subscribe({
      next: () => {
        const updatedItems = this.itemListSignal().filter((g: ICategoria) => g.id != game.id);
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
