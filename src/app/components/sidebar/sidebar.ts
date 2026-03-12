import { Component, inject, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import { EventsService } from '../../services/events.service'
import { Event } from '../../interfaces/event'

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar implements OnInit, OnChanges{
  @Input() searchTerm: string = '';
  @Output() eventSelected = new EventEmitter<string>();
  
  private eventService = inject(EventsService);
  events: Event[] = [];

  ngOnInit(){
    this.events = this.eventService.getEvents();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['searchTerm']) {
      this.events = this.eventService.searchEvents(this.searchTerm);
    }
  }

}
