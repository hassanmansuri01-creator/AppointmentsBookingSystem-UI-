export interface Appointment {
  Id: number;
  PatientName: string;
  StartTime: string; // ISO string, e.g. "2025-09-14T10:00:00"
  EndTime: string;
  DoctorName: string;
}