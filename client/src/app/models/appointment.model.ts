export interface Appointment {
  id?: number;
  patientName: string;
  email: string;
  scheduledDate: string; 
  slot: string;
  doctorId: number;  
}
