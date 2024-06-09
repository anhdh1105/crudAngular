import { Component, inject } from '@angular/core';
import { IProduct } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  products: IProduct[] = [];
  productServices = inject(ProductService);

  ngOnInit() {
    this.productServices.getAll().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  handleSubmit(id: string) {
    if (window.confirm('Chac chan muon xoa khong ?')) {
      this.productServices.delete(id).subscribe({
        next: () => {
          alert('Xoa thanh cong');
          this.ngOnInit();
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
