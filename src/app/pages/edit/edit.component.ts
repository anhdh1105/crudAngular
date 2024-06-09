import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent {
  router = inject(Router);
  route = inject(ActivatedRoute);
  products: any = [];
  productId!: string;
  productService = inject(ProductService);
  addForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required, Validators.min(1)]),
    desc: new FormControl('', [Validators.required]),
    active: new FormControl('false'),
  });

  ngOnInit() {
    this.route.params.subscribe((param) => {
      this.productId = param['id'];
      this.productService.getOne(this.productId).subscribe({
        next: (data) => {
          this.addForm.patchValue(data);
        },
        error: (err) => {
          console.log(err);
        },
      });
    });
  }

  handleSubmit() {
    console.log(this.addForm.value);
    this.productService.update(this.productId, this.addForm.value).subscribe({
      next: (data) => {
        alert('Update thanh cong');
        this.router.navigate(['/admin/list']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
