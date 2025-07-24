using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;
using server.Services;

public class AppointmentService : IAppointmentService
{
    private readonly AppointmentContext _context;
        private readonly EmailService _emailService;
    
        public AppointmentService(AppointmentContext context, EmailService emailService)
        {
            _context = context;
            _emailService = emailService;
 
        }

    public List<string> GetAvailableSlots(int doctorId, DateOnly date)
    {
        // Example: 10 AM to 5 PM, hourly slots
        var allSlots = new List<string>
        {
            "09:00 AM - 10:00 AM",
            "10:00 AM - 11:00 AM",
            "11:00 AM - 12:00 PM",
            "12:00 PM - 01:00 PM",
            "01:00 PM - 02:00 PM",
            "02:00 PM - 03:00 PM",
            "03:00 PM - 04:00 PM",
            "04:00 PM - 05:00 PM"
        };

        // Get booked slots for this doctor on the date
        var bookedSlots = _context.Appointments
            .Where(a => a.DoctorId == doctorId && a.ScheduledDate == date)
            .Select(a => a.Slot)
            .ToList();

        // Remove booked slots from allSlots
        var availableSlots = allSlots.Except(bookedSlots).ToList();

        return availableSlots;
    }

    public async Task<Appointment> CreateAppointmentAsync(Appointment appointment)
    {
        _context.Appointments.Add(appointment);
        await _context.SaveChangesAsync();

        string body = $"<h2>Appointment Confirmed</h2><p>Hello {appointment.PatientName}, your appointment is scheduled on {appointment.ScheduledDate} at {appointment.Slot}.</p>";

        await _emailService.SendEmailAsync(appointment.Email, "Appointment Confirmation", body);

        return appointment;
    }

    public async Task UpdateAppointmentAsync(int id, Appointment appointment)
    {
        if (id != appointment.Id)
            throw new ArgumentException("Invalid appointment ID");

        _context.Entry(appointment).State = EntityState.Modified;
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAppointmentAsync(int id)
    {
        var appointment = await _context.Appointments.FindAsync(id);
        if (appointment == null)
            throw new KeyNotFoundException("Appointment not found");

        string body = $"<h2>Appointment Cancelled</h2><p>Hello {appointment.PatientName}, As per your request your appointment has been cancelled for {appointment.ScheduledDate} at {appointment.Slot}.</p>";
        await _emailService.SendEmailAsync(appointment.Email, "Appointment Cancelled", body);

        _context.Appointments.Remove(appointment);
        await _context.SaveChangesAsync();
    }
}
