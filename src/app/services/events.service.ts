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
      date: '2026-07-15',
      time: '20:00',
      address: 'Piața Unirii, Timișoara',
      description: 'Concert de jazz în aer liber cu trupe locale și internaționale. Intrare liberă, atmosferă relaxată.',
      price: 0,
      tags: ['jazz', 'outdoor', 'free'],
      lat: 45.7389,
      lng: 21.1956
    },
    {
      id: '2',
      title: 'React & Angular Meetup',
      category: 'tech',
      date: '2026-07-18',
      time: '18:30',
      address: 'Hub-ul de Inovare, Timișoara',
      description: 'Întâlnire lunară a comunității de frontend din Timișoara. Prezentări, networking, pizza.',
      price: 0,
      tags: ['react', 'angular', 'frontend', 'networking'],
      lat: 45.7623,
      lng: 21.2278
    },
    {
      id: '3',
      title: 'Cros Orașului',
      category: 'sport',
      date: '2026-07-22',
      time: '09:00',
      address: 'Parcul Rozelor, Timișoara',
      description: 'Alergare urbană prin parcurile orașului. Trasee de 5km și 10km disponibile.',
      price: 25,
      tags: ['running', 'sport', 'outdoor'],
      lat: 45.7334,
      lng: 21.2267
    },
    {
      id: '4',
      title: 'Expoziție Foto: Urban Timișoara',
      category: 'art',
      date: '2026-07-22',
      time: '10:00',
      address: 'Muzeul de Artă, Timișoara',
      description: 'Expoziție de fotografie urbană realizată de fotografi locali. Vernisaj cu muzică live.',
      price: 15,
      tags: ['foto', 'arta', 'cultura'],
      lat: 45.7567,
      lng: 21.1989
    },
    {
      id: '5',
      title: 'Food Festival Bănățean',
      category: 'food',
      date: '2026-07-25',
      time: '12:00',
      address: 'Piața Victoriei, Timișoara',
      description: 'Festival culinar cu mâncăruri tradiționale bănățene și internaționale. 30+ standuri.',
      price: 0,
      tags: ['food', 'traditional', 'festival'],
      lat: 45.7445,
      lng: 21.2401
    },
    {
      id: '6',
      title: 'Stand-up Comedy Night',
      category: 'entertainment',
      date: '2026-03-13',
      time: '21:00',
      address: 'Club Doors, Timișoara',
      description: 'Seară de stand-up comedy cu cei mai buni comedianți din România. Râs garantat!',
      price: 30,
      tags: ['comedy', 'standup', 'indoor'],
      lat: 45.7498,
      lng: 21.2301
    },
    {
      id: '7',
      title: 'Open Mic Poezie',
      category: 'art',
      date: '2026-03-13',
      time: '19:00',
      address: 'Cafeneaua Veche, Timișoara',
      description: 'Seară de poezie și proză scurtă. Toți sunt bineveniți să urce pe scenă.',
      price: 0,
      tags: ['poetry', 'art', 'indoor'],
      lat: 45.7612,
      lng: 21.2134
    },
    {
      id: '8',
      title: 'Yoga în Parc',
      category: 'sport',
      date: '2026-03-14',
      time: '08:00',
      address: 'Parcul Central, Timișoara',
      description: 'Sesiune de yoga în aer liber pentru toate nivelurile. Aduce-ți salteaua!',
      price: 0,
      tags: ['yoga', 'sport', 'outdoor'],
      lat: 45.7334,
      lng: 21.1978
    },
    {
      id: '9',
      title: 'Concert Indie Rock',
      category: 'music',
      date: '2026-03-14',
      time: '20:30',
      address: 'Manufactura, Timișoara',
      description: 'Concert indie rock cu trupe locale emergente. O seară plină de energie.',
      price: 20,
      tags: ['rock', 'indie', 'live', 'indoor'],
      lat: 45.7467,
      lng: 21.2389
    },
    {
      id: '10',
      title: 'Târg de Carte',
      category: 'culture',
      date: '2026-03-15',
      time: '10:00',
      address: 'Piața Libertății, Timișoara',
      description: 'Târg de carte second-hand și nouă. Zeci de edituri și librării prezente.',
      price: 0,
      tags: ['books', 'culture', 'outdoor'],
      lat: 45.7589,
      lng: 21.1956
    },
    {
      id: '11',
      title: 'DJ Set Electronic',
      category: 'music',
      date: '2026-03-15',
      time: '22:00',
      address: 'Club Plai, Timișoara',
      description: 'Noapte de muzică electronică cu DJ-uri din scena locală și internațională.',
      price: 35,
      tags: ['electronic', 'dj', 'club', 'indoor'],
      lat: 45.7412,
      lng: 21.2312
    },
    {
      id: '12',
      title: 'Workshop Fotografie',
      category: 'art',
      date: '2026-03-17',
      time: '14:00',
      address: 'Studio Arte, Timișoara',
      description: 'Workshop practic de fotografie urbană pentru începători și avansați.',
      price: 50,
      tags: ['foto', 'workshop', 'art', 'indoor'],
      lat: 45.7645,
      lng: 21.2089
    }
  ];

  getEvents(): Event[] {
    return this.events;
  }

  searchEvents(term: string, date?: string, dateTo?: string): Event[] {
    return this.events.filter(event => {
      const matchesTerm = !term.trim() ||
        event.title.toLowerCase().includes(term.toLowerCase()) ||
        event.category.toLowerCase().includes(term.toLowerCase()) ||
        event.tags.some(tag => tag.toLowerCase().includes(term.toLowerCase()));

      let matchesDate: boolean;

      if (date && dateTo) {
        matchesDate = event.date >= date && event.date <= dateTo;
      } else {
        matchesDate = !date || event.date === date;
      }

      return matchesTerm && matchesDate;
    });
  }

  getEventById(id: string) : Event | undefined{
    return this.events.find(event => event.id === id);
  }

  addEvent(newEvent: Event) : void{
    this.events.push(newEvent);
  }
}
