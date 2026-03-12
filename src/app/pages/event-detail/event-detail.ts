import { Component, inject, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, RouterLink} from '@angular/router';
import { EventsService } from '../../services/events.service'
import { Event } from '../../interfaces/event'
import * as L from 'leaflet';

@Component({
  selector: 'app-event-detail',
  imports: [RouterLink],
  templateUrl: './event-detail.html',
  styleUrl: './event-detail.css',
})
export class EventDetail implements OnInit{
  private route = inject(ActivatedRoute);
  private eventService = inject(EventsService);
  event!: Event | undefined;

  private id = this.route.snapshot.params['id'];

  private map!: L.Map;
  private marker!: L.Marker;
  
  @ViewChild('mapContainer') mapContainer!: ElementRef;

  ngOnInit(){
    this.event = this.eventService.getEventById(this.id);
  }

  ngAfterViewInit(){
    if (!this.event) return;

    this.map = L.map(this.mapContainer.nativeElement)
      .setView([this.event.lat, this.event.lng], 16);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '© CartoDB'
    }).addTo(this.map);

    const customIcon = L.divIcon({
      className: 'custom-marker',
      html: `
        <div class="marker-wrapper">
          <div class="marker-dot"></div>
          <div class="marker-line"></div>
          <div class="marker-label">${this.event.title}</div>
        </div>
      `,
      iconSize: [120, 40],
      iconAnchor: [60, 40]
    });

    this.marker = L.marker([this.event.lat, this.event.lng], {
      icon: customIcon
    }).addTo(this.map);
  }
}
