import { Component, ChangeDetectorRef,OnInit } from '@angular/core';
import { AppointmentService } from '../services/appointment.service';
import { Appointment } from '../models/appointment.model';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router'; // <-- Import RouterModule
@Component({
  selector: 'app-appointment-list',
  standalone: true,
  templateUrl: './appointment-list.html',
  styleUrls: ['./appointment-list.css'],
  imports: [CommonModule,RouterModule]
})
export class AppointmentListComponent implements OnInit {
  appointments: Appointment[] = [];
  loading = false;
  error = '';

  constructor(private appointmentService: AppointmentService,private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.fetchAppointments();
  }

  fetchAppointments() {
    this.loading = true;
    this.error = '';
    this.appointmentService.getAppointments().subscribe({
      next: (data) => {
        this.appointments = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = 'Failed to load appointments';
        this.loading = false;
      }
    });
  }

  deleteAppointment(id: number) {
    if (confirm('Are you sure you want to delete this appointment?')) {
      this.appointmentService.deleteAppointment(id).subscribe({
        next: () => this.fetchAppointments(),
        error: () => this.error = 'Failed to delete appointment'
      });
    }
  }

  // You will add edit logic later
}