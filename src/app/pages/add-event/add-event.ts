import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { EventsService } from '../../services/events.service';
import { Event } from '../../interfaces/event'
@Component({
  selector: 'app-add-event',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-event.html',
  styleUrl: './add-event.css',
})
export class AddEvent {
  private fb = inject(FormBuilder);
  private eventService = inject(EventsService);
  router = inject(Router);

  errorMessage: string | null = null;

  addEventForm = this.fb.group({
    title: ['', Validators.required],
    category: ['', Validators.required],
    date: ['', Validators.required],
    time: ['', Validators.required],
    address: ['', Validators.required],
    description: ['', Validators.required],
    price: [0, Validators.required],
    tags: ['', Validators.required],
    lat: ['', Validators.required],
    lng: ['', Validators.required]
  });

  onSubmit(){
    const formValue = this.addEventForm.value;
  
    const newEvent: Event = {
      id: String(Date.now()),
      title: formValue.title!,
      category: formValue.category!,
      date: formValue.date!,
      time: formValue.time!,
      address: formValue.address!,
      description: formValue.description!,
      price: Number(formValue.price),
      tags: formValue.tags!.split(',').map(t => t.trim()),
      lat: Number(formValue.lat),
      lng: Number(formValue.lng)
    };

    this.eventService.addEvent(newEvent);
    this.router.navigate(['/map']);
  }

}
