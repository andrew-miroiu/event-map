import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, inject } from '@angular/core';
import { Router } from '@angular/router';
import { EventsService } from '../../services/events.service'
import { Event } from '../../interfaces/event'
import { Sidebar } from '../../components/sidebar/sidebar'
import { Navbar } from '../../components/navbar/navbar'
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [Sidebar, Navbar],
  templateUrl: './map.html',
  styleUrl: './map.css',
})
export class Map implements AfterViewInit, OnInit {

  private router = inject(Router);
  private eventService = inject(EventsService);
  private events: Event[] = [];

  searchTerm: string = '';

  private map!: L.Map;
  private markers: L.Marker[] = [];

  isSidebarOpen: boolean = true;

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

    this.map = L.map(this.mapContainer.nativeElement).setView([45.7489, 21.2087], 14);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '© CartoDB'
    }).addTo(this.map);

    this.updateMarkers();
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    setTimeout(() => {
      this.map.invalidateSize();
    }, 0);
  }

  onSearch(term: string) {
    this.searchTerm = term;
    this.updateMarkers();
  }

  updateMarkers(){
    this.markers.forEach(marker => marker.remove());
    this.markers = [];

    const filtered = this.eventService.searchEvents(this.searchTerm);
    filtered.forEach((event) => {
      const marker = L.marker([event.lat, event.lng], {riseOnHover: true})
        .addTo(this.map);
      marker.bindPopup(event.title);
      marker.on('mouseover', () => marker.openPopup());
      marker.on('mouseout', () => marker.closePopup());
      marker.on('click', () => this.goToEvent(event.id))
      this.markers.push(marker);
    })
  }

  goToEvent(id: string){
    this.router.navigate(['event', id])
  }
}