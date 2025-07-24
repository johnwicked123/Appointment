using server.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace AppointmentBooking.Data
{
    public class AppointmentContext : DbContext
    {
        public AppointmentContext(DbContextOptions<AppointmentContext> options) : base(options) { }

        public DbSet<Appointment> Appointments => Set<Appointment>();
    }
}
