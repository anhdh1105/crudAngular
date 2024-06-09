import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent {
  router = inject(Router);
  productService = inject(ProductService);
  addForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  handleSubmit() {
    console.log(this.addForm.value);
    this.productService.signin(this.addForm.value).subscribe({
      next: (data) => {
        alert('Dang nhap thanh cong');
        window.localStorage.setItem(
          'token',
          (data as { accessToken: string }).accessToken
        );
        this.router.navigate(['/admin/list']);
      },
      error: (err) => {
        alert('Sai thong tin dang nhap');
        console.log(err);
      },
    });
  }
}
