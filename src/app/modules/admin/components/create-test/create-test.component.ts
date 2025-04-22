import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AdminService } from '../../../auth/services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-test',
  standalone: true,
  imports: [SharedModule,ReactiveFormsModule],
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.css'] // Fixed typo: `styleUrl` → `styleUrls`
})
export class CreateTestComponent{
 
  testForm!: FormGroup; // Fixed syntax: `!=` → `!:`

  constructor(private fb: FormBuilder,
              private devicesService:AdminService,
              private notification:NzNotificationService,
              private router:Router,
              
  ) {}

  ngOnInit(): void {
    this.testForm = this.fb.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
      time: [null, Validators.required],
    });
  }
  submitForm() {
    if (this.testForm.valid) {
      this.devicesService.createTest(this.testForm.value).subscribe({
        next: (res) => {
          this.notification.success(
            'SUCCESS',
            'Test Created Successfully',
            { nzDuration: 5000 }
          );
          this.router.navigateByUrl("/admin/dashboard");
        },
        error: (err) => {
          console.error('Error details:', err);
          this.notification.error(
            'ERROR',
            err.error?.message || 'Failed to create test',
            { nzDuration: 5000 }
          );
        }
      });
    }
  }
}