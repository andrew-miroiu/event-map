import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EventsService } from './services/events.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('event-map');
}