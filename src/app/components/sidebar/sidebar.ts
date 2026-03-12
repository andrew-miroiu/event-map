import { Component, inject, OnInit} from '@angular/core';
import { EventsService } from '../../services/events.service'
import { Event } from '../../interfaces/event'

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar implements OnInit{
  private eventService = inject(EventsService);
  events: Event[] = [];

  ngOnInit(){
    this.events = this.eventService.getEvents();
  }

  onSearch(domEvent: globalThis.Event) {
    const term = (domEvent.target as HTMLInputElement).value;
    this.events = this.eventService.searchEvents(term);
  }

}
