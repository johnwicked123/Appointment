import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DOCTORS } from 'src/app/models/doctors';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.css']
})
export class AppointmentFormComponent implements OnInit {

  doctors = DOCTORS;
  appointmentForm!: FormGroup;
  minDate = new Date();

  isEditMode = false;

  availableSlots: string[] = [];

  constructor(private fb: FormBuilder, private appointmentService: AppointmentService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any, @Optional() private dialogRef: MatDialogRef<AppointmentFormComponent>) { }

  ngOnInit(): void {
    this.appointmentForm = this.fb.group({
      patientName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      scheduledDate: ['', Validators.required],
      doctorId: ['', Validators.required],
      slot: ['', Validators.required],
    });

    this.isEditMode = this.data?.mode === 'edit';

    if (this.isEditMode && this.data.appointment) {

      this.onDoctorSelected(this.data.appointment.doctorId, new Date(this.data.appointment.scheduledDate));
      this.appointmentForm.patchValue({
        patientName: this.data.appointment.patientName,
        email: this.data.appointment.email,
        scheduledDate: new Date(this.data.appointment.scheduledDate),
        doctorId: this.data.appointment.doctorId
      });
    }
  }

  submitAppointment(): void {
    if (this.appointmentForm.invalid) {
      this.appointmentForm.markAllAsTouched();
      return;
    }

    // Submit form logic here
    const formData = this.appointmentForm.value;
    const selectedDate: Date = this.appointmentForm.get('scheduledDate')!.value;
    formData.scheduledDate = selectedDate.toISOString().split('T')[0];
    if (this.isEditMode) {
      formData.id = this.data.appointment.id;
      this.dialogRef.close(formData);
    }
    else {
      this.appointmentService.addAppointment(formData).subscribe(
        (response) => {
          console.log('Appointment added successfully:', response);
          this.appointmentForm.reset();
          Object.keys(this.appointmentForm.controls).forEach(key => {
            this.appointmentForm.get('patientName')?.setErrors(null);
            this.appointmentForm.get('doctorId')?.setErrors(null);
            this.appointmentForm.get('slot')?.setErrors(null);
            this.appointmentForm.get('scheduledDate')?.setErrors(null)
            this.appointmentForm.get('email')?.setErrors(null)
            this.appointmentForm.get('doctorId')?.setErrors(null)
          });

        },
        (error) => {
          console.error('Error adding appointment:', error);
        }
      );
    }

  }

  onDoctorSelected(doctorId: number, selectedDate: Date) {
    if (doctorId && selectedDate) {
      const dateTimeString = selectedDate.toISOString().split('.')[0];

      this.appointmentService.getAvailableSlots(doctorId, dateTimeString).subscribe(
        (slots) => {
          this.availableSlots = slots;
          if (this.isEditMode) {
            this.availableSlots.push(this.data.appointment.slot);
            this.appointmentForm.patchValue({
              slot: this.data.appointment.slot
            });
          }
        },
        (error) => {
          console.error('Error fetching slots:', error);
        }
      );
    }
  }

}
