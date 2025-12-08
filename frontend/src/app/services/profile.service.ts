import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from './auth.service';

export interface ProgressLog {
  id?: number;
  user_id?: number;
  date?: string;
  weight?: number;
  body_fat_percentage?: number;
  muscle_mass?: number;
  notes?: string;
  measurements?: any;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = environment.apiUrl || 'http://localhost:5000/api';

  constructor(private http: HttpClient) { }

  getProfile(): Observable<{ user: User }> {
    return this.http.get<{ user: User }>(`${this.apiUrl}/profile`);
  }

  updateProfile(profileData: Partial<User>): Observable<{ user: User }> {
    return this.http.put<{ user: User }>(`${this.apiUrl}/profile`, profileData);
  }

  getProgressLogs(limit: number = 30): Observable<{ logs: ProgressLog[] }> {
    return this.http.get<{ logs: ProgressLog[] }>(`${this.apiUrl}/profile/progress?limit=${limit}`);
  }

  addProgressLog(log: ProgressLog): Observable<{ log: ProgressLog }> {
    return this.http.post<{ log: ProgressLog }>(`${this.apiUrl}/profile/progress`, log);
  }

  getStatistics(): Observable<any> {
    return this.http.get(`${this.apiUrl}/profile/statistics`);
  }
}
