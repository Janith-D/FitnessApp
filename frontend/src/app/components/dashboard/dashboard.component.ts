import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService, User } from '../../services/auth.service';
import { ProfileService } from '../../services/profile.service';
import { WorkoutService } from '../../services/workout.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  user: User | null = null;
  statistics: any = {};
  recentWorkouts: any[] = [];
  loading: boolean = true;

  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private workoutService: WorkoutService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.profileService.getProfile().subscribe({
      next: (response) => {
        this.user = response.user;
      },
      error: (error) => console.error('Error loading profile:', error)
    });

    this.profileService.getStatistics().subscribe({
      next: (stats) => {
        this.statistics = stats;
      },
      error: (error) => console.error('Error loading statistics:', error)
    });

    this.workoutService.getWorkouts('completed', 5).subscribe({
      next: (response) => {
        this.recentWorkouts = response.workouts;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading workouts:', error);
        this.loading = false;
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
