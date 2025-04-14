import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user/user.service';
import { User } from '../../models/AuthModel';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  userProfiles: User[] = [];

  constructor(private userService: UserService) {
    this.fetchAllUserProfiles();
  }

  fetchAllUserProfiles() {
    this.userService.getAllUserProfiles().subscribe((response) => {
      if (response && response.length > 0) {
        this.userProfiles = response;
      }
    });
  }

  signOut() {
    let confirmation = confirm('Are you sure you want to sign out?');

    if (confirmation) {
      this.userService.signOut('Logout out successfully.');
    }
  }
}
