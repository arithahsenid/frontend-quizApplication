import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Fixed import
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  validateForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private router: Router,
    private authService:AuthService
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      name: [null, [Validators.required]]
    });
  }

  submitForm() {
    if (this.validateForm.valid) {
      this.authService.register(this.validateForm.value).subscribe({
        next: (res) => {
          this.message.success(
            'Signup successful',
            { nzDuration: 5000 }
          );
          this.router.navigateByUrl('/login');
        },
        error: (error) => {
          this.message.error(
            error.error?.message || 'Registration failed',
            { nzDuration: 5000 }
          );
          console.error('Registration error:', error);
        }
      });
    } else {
      // Mark all fields as touched to show validation errors
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}