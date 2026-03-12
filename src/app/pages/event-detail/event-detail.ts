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

    const iconDefault = L.icon({
          iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
          iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
          shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
        });
    
        L.Marker.prototype.options.icon = iconDefault;

    this.map = L.map(this.mapContainer.nativeElement).setView([this.event.lat, this.event.lng], 16);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
          attribution: '© CartoDB'
        }).addTo(this.map);
    
    L.marker([this.event.lat, this.event.lng]).addTo(this.map)
        .bindPopup(this.event.title);

  }
}
