import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Workout {
  id?: number;
  user_id?: number;
  workout_type?: string;
  duration_minutes?: number;
  calories_burned?: number;
  intensity?: string;
  exercises?: any;
  notes?: string;
  status?: string;
  scheduled_date?: string;
  completed_date?: string;
  created_at?: string;
}

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  private apiUrl = environment.apiUrl || 'http://localhost:5000/api';

  constructor(private http: HttpClient) { }

  getWorkouts(status?: string, limit: number = 50): Observable<{ workouts: Workout[]; total: number }> {
    const params: any = { limit };
    if (status) params.status = status;
    return this.http.get<{ workouts: Workout[]; total: number }>(`${this.apiUrl}/workouts`, { params });
  }

  createWorkout(workout: Workout): Observable<{ workout: Workout }> {
    return this.http.post<{ workout: Workout }>(`${this.apiUrl}/workouts`, workout);
  }

  updateWorkout(id: number, workout: Partial<Workout>): Observable<{ workout: Workout }> {
    return this.http.put<{ workout: Workout }>(`${this.apiUrl}/workouts/${id}`, workout);
  }

  deleteWorkout(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/workouts/${id}`);
  }

  generateWorkout(preferences: any): Observable<{ workout: Workout }> {
    return this.http.post<{ workout: Workout }>(`${this.apiUrl}/workouts/generate`, preferences);
  }
}
