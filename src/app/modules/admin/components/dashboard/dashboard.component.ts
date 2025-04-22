import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // 👈 Add this
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AdminService } from '../../../auth/services/admin.service';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-dashboard',
  standalone: true, // Make sure this is a standalone component
  imports: [CommonModule, SharedModule], // 👈 Add CommonModule here
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  tests = [];

  constructor(
    private notification: NzNotificationService,
    private testService: AdminService
  ) {}

  ngOnInit() {
    this.getAllTests();
  }

  getAllTests() {
    this.testService.getAllTest().subscribe(
      res => {
        this.tests = res;
      },
      error => {
        this.notification.error(
          'ERROR',
          `Something Went Wrong. Try Again`,
          { nzDuration: 5000 }
        );
      }
    );
  }

  getFormattedTime(time): string {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes} minutes ${seconds} seconds`;
  }
}
