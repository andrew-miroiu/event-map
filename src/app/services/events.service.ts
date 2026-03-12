import { Injectable } from '@angular/core';
import { Event } from '../interfaces/event';

@Injectable({
  providedIn: 'root',
})
export class EventsService {

  private events: Event[] = [
    {
      id: '1',
      title: 'Jazz în Piața Unirii',
      category: 'music',
      date: '2025-07-15',
      time: '20:00',
      address: 'Piața Unirii, Timișoara',
      description: 'Concert de jazz în aer liber cu trupe locale și internaționale. Intrare liberă, atmosferă relaxată.',
      price: 0,
      tags: ['jazz', 'outdoor', 'free'],
      lat: 45.7489,
      lng: 21.2087
    },
    {
      id: '2',
      title: 'React & Angular Meetup',
      category: 'tech',
      date: '2025-07-18',
      time: '18:30',
      address: 'Hub-ul de Inovare, Timișoara',
      description: 'Întâlnire lunară a comunității de frontend din Timișoara. Prezentări, networking, pizza.',
      price: 0,
      tags: ['react', 'angular', 'frontend', 'networking'],
      lat: 45.7523,
      lng: 21.2195
    },
    {
      id: '3',
      title: 'Cros Orașului',
      category: 'sport',
      date: '2025-07-20',
      time: '09:00',
      address: 'Parcul Rozelor, Timișoara',
      description: 'Alergare urbană prin parcurile orașului. Trasee de 5km și 10km disponibile.',
      price: 25,
      tags: ['running', 'sport', 'outdoor'],
      lat: 45.7412,
      lng: 21.2156
    },
    {
      id: '4',
      title: 'Expoziție Foto: Urban Timișoara',
      category: 'art',
      date: '2025-07-22',
      time: '10:00',
      address: 'Muzeul de Artă, Timișoara',
      description: 'Expoziție de fotografie urbană realizată de fotografi locali. Vernisaj cu muzică live.',
      price: 15,
      tags: ['foto', 'arta', 'cultura'],
      lat: 45.7501,
      lng: 21.2063
    },
    {
      id: '5',
      title: 'Food Festival Bănățean',
      category: 'food',
      date: '2025-07-25',
      time: '12:00',
      address: 'Piața Victoriei, Timișoara',
      description: 'Festival culinar cu mâncăruri tradiționale bănățene și internaționale. 30+ standuri.',
      price: 0,
      tags: ['food', 'traditional', 'festival'],
      lat: 45.7476,
      lng: 21.2082
    }
  ];

  getEvents(): Event[] {
    return this.events;
  }

  searchEvents(term: string): Event[] {
    if (!term.trim()) {
      return this.events;
    }
    
    const lower = term.toLowerCase();
    return this.events.filter(event =>
      event.title.toLowerCase().includes(lower) ||
      event.category.toLowerCase().includes(lower) ||
      event.tags.some(tag => tag.toLowerCase().includes(lower))
    );
  }

  getEventById(id: string) : Event | undefined{
    return this.events.find(event => event.id === id);
  }

}
