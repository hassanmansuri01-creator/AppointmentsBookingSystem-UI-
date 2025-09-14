import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AppointmentService } from '../services/appointment.service';
import { Appointment } from '../models/appointment.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-appointment-form',
  standalone: true,
  templateUrl: './appointment-form.html',
  styleUrls: ['./appointment-form.css'],
  imports: [CommonModule, FormsModule]
})
export class AppointmentForm implements OnInit {
  appointment: Partial<Appointment> = {};
  isEditMode = false;
  id: number | null = null;
  error = '';

  constructor(
    private appointmentService: AppointmentService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.isEditMode = !!this.id;

    if (this.isEditMode) {
      this.appointmentService.getAppointments().subscribe({
        next: (appts) => {
          const found = appts.find(a => a.Id === this.id);
          if (found) {
            this.appointment = { ...found };
          } else {
            this.error = 'Appointment not found';
          }
          this.cdr.detectChanges();
        },
        error: () => {
          this.error = 'Failed to load appointment';
          this.cdr.detectChanges();
        }
      });
    }
  }

  onSubmit() {
    if (this.isEditMode && this.id) {
      this.appointmentService.updateAppointment(this.id, this.appointment as Appointment).subscribe({
        next: () => this.router.navigate(['/']),
        error: () => {
          this.error = 'Failed to update appointment';
          this.cdr.detectChanges();
        }
      });
    } else {
      this.appointmentService.addAppointment(this.appointment as Omit<Appointment, 'id'>).subscribe({
        next: () => this.router.navigate(['/']),
        error: () => {
          this.error = 'Failed to add appointment';
          this.cdr.detectChanges();
        }
      });
    }
  }
}