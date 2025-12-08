import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ChatMessage {
  id?: number;
  user_id?: number;
  message: string;
  response?: string;
  intent?: string;
  sentiment?: string;
  timestamp?: string;
}

export interface ChatResponse {
  response: string;
  intent?: string;
  sentiment?: string;
  suggestions?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = environment.apiUrl || 'http://localhost:5000/api';

  constructor(private http: HttpClient) { }

  sendMessage(message: string): Observable<ChatResponse> {
    return this.http.post<ChatResponse>(`${this.apiUrl}/chat/message`, { message });
  }

  getChatHistory(limit: number = 50): Observable<{ messages: ChatMessage[] }> {
    return this.http.get<{ messages: ChatMessage[] }>(`${this.apiUrl}/chat/history?limit=${limit}`);
  }

  clearHistory(): Observable<any> {
    return this.http.delete(`${this.apiUrl}/chat/history`);
  }
}
