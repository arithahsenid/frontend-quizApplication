import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from '../services/auth.service';
import { SharedModule } from '../../shared/shared.module';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { UserStorageService } from '../services/user-storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private message: NzMessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
  }
  submitForm() {
    this.authService.login(this.validateForm.value).subscribe({
      next: (res) => {
        this.message.success('Login Success', { nzDuration: 5000 });
        const user={
          id:res.id,
          role:res.role
        }
        UserStorageService.saveUser(user);
        if(UserStorageService.isAdminLoggedIn()){
          this.router.navigateByUrl('admin/dashboard')
        }
        else if(UserStorageService.isUserLoggedIn()){
          this.router.navigateByUrl('user/dashboard')
        }
        console.log(res);
      },

      error: (err) => {
        this.message.error('Bad credentials', { nzDuration: 5000 });
      }
    });
  }
  }