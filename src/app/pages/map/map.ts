import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, inject } from '@angular/core';
import { EventsService } from '../../services/events.service'
import { Event } from '../../interfaces/event'
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.html',
  styleUrl: './map.css',
})
export class Map implements AfterViewInit, OnInit {

  private eventService = inject(EventsService);
  private events: Event[] = [];

  ngOnInit(){
    this.events = this.eventService.getEvents();
  }

  @ViewChild('mapContainer') mapContainer!: ElementRef;

  ngAfterViewInit() {

    const iconDefault = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    });

    L.Marker.prototype.options.icon = iconDefault;

    const map = L.map(this.mapContainer.nativeElement).setView([45.7489, 21.2087], 14);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '© CartoDB'
    }).addTo(map);

    this.events.forEach((event) => {
      const marker = L.marker([event.lat, event.lng], { riseOnHover: true }).addTo(map);
      marker.bindPopup(event.title);
      marker.on('mouseover', () => marker.openPopup());
      marker.on('mouseout', () => marker.closePopup());
    })
  }
}