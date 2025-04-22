import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserStorageService } from './modules/auth/services/user-storage.service';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzHeaderComponent } from 'ng-zorro-antd/layout';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, NzHeaderComponent, NzButtonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'quiz-app';

  get isUserLoggedIn(): boolean {
    return UserStorageService.isUserLoggedIn();
  }

  get isAdminLoggedIn(): boolean {
    return UserStorageService.isAdminLoggedIn();
  }

  logout(): void {
    UserStorageService.signOut();
    
  }
}