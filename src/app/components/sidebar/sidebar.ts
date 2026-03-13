import { Component, inject, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import { DatePipe } from '@angular/common';
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
  @Input() selectedDate: string = '';
  @Input() selectedDateTo: string = '';
  @Output() eventSelected = new EventEmitter<string>();
  @Output() dateSelected = new EventEmitter<{from: string, to: string}>();

  private eventService = inject(EventsService);
  events: Event[] = [];

  today = new Date();

  ngOnInit(){
    this.events = this.eventService.getEvents();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['searchTerm'] || changes['selectedDate'] || changes['selectedDateTo']) {
      this.events = this.eventService.searchEvents(this.searchTerm, this.selectedDate, this.selectedDateTo);
    }
  }

  onDateChange(event: globalThis.Event){
    this.selectedDate = (event.target as HTMLInputElement).value;
    this.dateSelected.emit({from: this.selectedDate, to: this.selectedDate});
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  setQuickDate(date: string) {
    if (date === 'today') {
      this.selectedDate = this.formatDate(this.today);
      this.dateSelected.emit({ from: this.selectedDate, to: this.selectedDate });
    } else if (date === 'tomorrow') {
      const tomorrow = new Date();
      tomorrow.setDate(this.today.getDate() + 1);
      this.selectedDate = this.formatDate(tomorrow);
      this.dateSelected.emit({ from: this.selectedDate, to: this.selectedDate });
    } else if (date === 'week') {
      const weekEnd = new Date();
      weekEnd.setDate(this.today.getDate() + 7);
      this.dateSelected.emit({ from: this.formatDate(this.today), to: this.formatDate(weekEnd) });
    } else {
      this.selectedDate = '';
      this.dateSelected.emit({ from: '', to: '' });
    }
  }

}
