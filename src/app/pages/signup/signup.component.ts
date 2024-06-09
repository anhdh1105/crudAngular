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
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  router = inject(Router);
  productService = inject(ProductService);
  addForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    repass: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  handleSubmit() {
    console.log(this.addForm.value);
    const password = this.addForm.value.password;
    const repass = this.addForm.value.repass;
    if (password === repass) {
      this.productService.signup(this.addForm.value).subscribe({
        next: (data) => {
          alert('Dang ky thanh cong,vui long dang nhap');
          this.router.navigate(['/signin']);
        },
        error: (err) => {
          alert('Vui long kiem tra lai thong tin');
          console.log(err);
        },
      });
    } else {
      alert('Mat khau khong trung khop');
    }
  }
}
