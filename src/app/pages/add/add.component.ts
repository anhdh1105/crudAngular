import { NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css',
})
export class AddComponent {
  router = inject(Router);
  productService = inject(ProductService);
  addForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required, Validators.min(1)]),
    desc: new FormControl('', [Validators.required]),
    active: new FormControl('false'),
  });

  handleSubmit() {
    console.log(this.addForm.value);
    this.productService.add(this.addForm.value).subscribe({
      next: (data) => {
        alert('Them thanh cong');
        this.router.navigate(['/admin/list']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
