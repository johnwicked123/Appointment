import { Component, Inject, OnInit } from '@angular/core';
import { Appointment } from 'src/app/models/appointment.model';
import { AppointmentService } from 'src/app/services/appointment.service';
import { DOCTORS } from 'src/app/models/doctors';
import { AppointmentFormComponent } from '../appointment-form/appointment-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {

  
  constructor(private appointmentService: AppointmentService,private dialog: MatDialog) { }


  doctors = DOCTORS;
  
  displayedColumns: string[] = ['id', 'name', 'email', 'date', 'slot', 'doctorName', 'actions'];
  appointments: Appointment[] = [];

  ngOnInit(): void {
   
    this.appointmentService.getAppointments().subscribe({
      next: (data: Appointment[]) => {
        this.appointments = data;
        console.log('Fetched appointments:', this.appointments);
      },
      error: (err: any) => {
        console.error('Error fetching appointments', err);
      }
    });
  }
  
  onDelete(appointment: Appointment) {
    const confirmDelete = confirm(`Are you sure you want to delete appointment for ${appointment.patientName}?`);
    if (confirmDelete) {
      this.appointmentService.deleteAppointment(appointment.id!).subscribe({
        next: () => {
          // Remove the appointment from the local array manually
          this.appointments = this.appointments.filter(a => a.id !== appointment.id);
          console.log('Appointment deleted successfully');
        },
        error: (err: any) => {
          console.error('Error deleting appointment', err);
        }
      });
    }
  }
  
  
  

  getDoctorNameById(id: number): string {
    const doctor = this.doctors.find(d => d.id === id);
    return doctor ? doctor.name : 'Unknown';
  }
  

  onEdit(appointment: Appointment): void {
    const dialogRef = this.dialog.open(AppointmentFormComponent, {
      data: {
        mode: 'edit',
        appointment: appointment // pass this only in edit mode
      }// pass appointment data to dialog
    });
  
    dialogRef.afterClosed().subscribe(updated => {
      if (updated) {
        this.appointmentService.updateAppointment(updated).subscribe({
          next: () => {
            // update locally for immediate UI response
            const index = this.appointments.findIndex(a => a.id === updated.id);
            if (index !== -1) {
              const updatedAppointments = [...this.appointments];
              updatedAppointments[index] = updated;
              this.appointments = updatedAppointments;
            }
          },
          error: err => console.error('Update failed', err)
        });
      }
    });
  }
}
