using server.Data;
using server.Models;
using server.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;
using server.Services;

namespace AppointmentApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AppointmentController : ControllerBase
    {
        private readonly AppointmentContext _context;

        private readonly IAppointmentService _appointmentService;
        public AppointmentController(AppointmentContext context, IAppointmentService appointmentService)
        {
            _context = context;

            _appointmentService = appointmentService;
        }

        [HttpGet("available-slots")]
        public IActionResult GetAvailableSlots(int doctorId, DateOnly date)
        {
            return Ok(_appointmentService.GetAvailableSlots(doctorId, date));
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<Appointment>>> Get()
        {
            return await _context.Appointments.ToListAsync();
        }


        [HttpPost]
        public async Task<ActionResult<Appointment>> Post(Appointment appointment)
        {
            var createdAppointment = await _appointmentService.CreateAppointmentAsync(appointment);

            return CreatedAtAction(nameof(Get), new { id = createdAppointment.Id }, createdAppointment);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, Appointment appointment)
        {
            await _appointmentService.UpdateAppointmentAsync(id, appointment);
            return NoContent();
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _appointmentService.DeleteAppointmentAsync(id);
            return NoContent();
        }
    }
}
