using server.Models;

namespace server.Services
{
    public interface IAppointmentService
    {
        List<string> GetAvailableSlots(int doctorId, DateOnly date);

        Task<Appointment> CreateAppointmentAsync(Appointment appointment);
        Task UpdateAppointmentAsync(int id, Appointment appointment);
        Task DeleteAppointmentAsync(int id);
    }

}
