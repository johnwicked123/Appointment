import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Appointment } from '../models/appointment.model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private baseUrl = 'http://localhost:5284/api/Appointment';

  constructor(private http: HttpClient) {}

  
  getAvailableSlots(doctorId: number, date: string): Observable<any[]> {
    const url = `${this.baseUrl}/available-slots?doctorId=${doctorId}&date=${date}`;
    return this.http.get<any[]>(url).pipe(
      catchError(this.handleError)
    );
  }
  
  addAppointment(appointment: Appointment): Observable<Appointment> {
    return this.http.post<any>(this.baseUrl, appointment).pipe(
      catchError(this.handleError)
    );
  }
  
  getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.baseUrl}`);
  }

  updateAppointment(appt: Appointment): Observable<any> {
    return this.http.put(`${this.baseUrl}/${appt.id}`, appt);
  }

  deleteAppointment(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('API Error:', error);
    return throwError(() => new Error('Something went wrong fetching available slots.'));
  }
}
