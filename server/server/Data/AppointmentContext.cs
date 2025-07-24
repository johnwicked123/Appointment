using server.Models;
using Microsoft.EntityFrameworkCore;

namespace server.Data
{
    public class AppointmentContext : DbContext
    {
        public AppointmentContext(DbContextOptions<AppointmentContext> options) : base(options) { }

        public DbSet<Appointment> Appointments => Set<Appointment>();
    }
}
