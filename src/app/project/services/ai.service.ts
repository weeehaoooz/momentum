import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

@Injectable({
  providedIn: 'root'
})
export class AiService {
  private http = inject(HttpClient);
  private apiUrl = '/v1/chat/completions';

  private systemPrompt = `You are a helpful project management assistant. You help the user manage their tasks.
If the user asks to create one or more tasks, you MUST return a JSON object with the following format:
{
  "action": "create_issues",
  "data": [
    {
      "title": "Task Title 1",
      "description": "Task Description 1",
      "priority": "MEDIUM",
      "status": "TODO"
    },
    {
      "title": "Task Title 2",
      "description": "Task Description 2",
      "priority": "HIGH",
      "status": "TODO"
    }
  ]
}
Do not wrap the JSON in markdown code blocks. Just return the raw JSON string.
If the user asks a general question, just answer normally as text.`;

  sendMessage(messages: ChatMessage[]): Observable<any> {
    const payload = {
      messages: [
        { role: 'system', content: this.systemPrompt },
        ...messages
      ],
      temperature: 0.7,
      max_tokens: -1,
      stream: false
    };

    return this.http.post(this.apiUrl, payload);
  }
}
