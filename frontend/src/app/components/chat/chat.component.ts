import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ChatService, ChatMessage } from '../../services/chat.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-chat',
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
  messages: ChatMessage[] = [];
  currentMessage: string = '';
  loading: boolean = false;

  constructor(
    private chatService: ChatService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadChatHistory();
  }

  loadChatHistory(): void {
    this.chatService.getChatHistory().subscribe({
      next: (response) => {
        this.messages = response.messages;
      },
      error: (error) => {
        console.error('Error loading chat history:', error);
        if (error.status === 401 || error.status === 422 || error.status === 0) {
          this.authService.logout();
          this.router.navigate(['/login']);
        }
      }
    });
  }

  sendMessage(): void {
    if (!this.currentMessage.trim() || this.loading) {
      return;
    }

    const userMessage = this.currentMessage;
    this.messages.push({
      message: userMessage,
      timestamp: new Date().toISOString()
    });

    this.currentMessage = '';
    this.loading = true;

    this.chatService.sendMessage(userMessage).subscribe({
      next: (response) => {
        this.messages.push({
          message: userMessage,
          response: response.response,
          intent: response.intent,
          sentiment: response.sentiment,
          timestamp: new Date().toISOString()
        });
        this.loading = false;
      },
      error: (error) => {
        console.error('Error sending message:', error);
        this.loading = false;
        if (error.status === 401 || error.status === 422 || error.status === 0) {
          this.authService.logout();
          this.router.navigate(['/login']);
        }
      }
    });
  }

  clearHistory(): void {
    if (confirm('Are you sure you want to clear chat history?')) {
      this.chatService.clearHistory().subscribe({
        next: () => {
          this.messages = [];
        },
        error: (error) => {
          console.error('Error clearing history:', error);
        }
      });
    }
  }
}
