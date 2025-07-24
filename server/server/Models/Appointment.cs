using System.ComponentModel.DataAnnotations;

namespace server.Models
{
    public class Appointment
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Patient name is required")]
        public string PatientName { get; set; }

        [Required(ErrorMessage = "Scheduled date is required")]
        public DateOnly ScheduledDate { get; set; }

        [Required(ErrorMessage = "Slot is required")]
        public string Slot { get; set; }

        [Required(ErrorMessage = "Doctor ID is required")]
        public int DoctorId { get; set; }

        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email format")]
        public string Email { get; set; }
    }
}
