using Microsoft.AspNetCore.Mvc;
using SLTB.Server.Models;
using SLTB.Server.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SLTB.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BusScheduleController : ControllerBase
    {
        private readonly IBusScheduleService _busScheduleService;

        public BusScheduleController(IBusScheduleService busScheduleService)
        {
            _busScheduleService = busScheduleService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<BusSchedule>>> GetBusSchedules()
        {
            var busSchedules = await _busScheduleService.GetBusSchedules();
            return Ok(busSchedules);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BusSchedule>> GetBusSchedule(int id)
        {
            var busSchedule = await _busScheduleService.GetBusSchedule(id);
            if (busSchedule == null)
                return NotFound();
            return Ok(busSchedule);
        }

        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<BusSchedule>>> GetBusSchedulesCustom(string startLocation, string endLocation, string date)
        {
            var busSchedules = await _busScheduleService.GetBusSchedulesCustom(startLocation, endLocation, date);
            return Ok(busSchedules);
        }

        [HttpPost]
        public async Task<ActionResult<BusSchedule>> CreateBusSchedule([FromBody] BusSchedule busSchedule)
        {
            var createdSchedule = await _busScheduleService.CreateBusSchedule(busSchedule);
            return CreatedAtAction(nameof(GetBusSchedule), new { id = createdSchedule.Id }, createdSchedule);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBusSchedule(int id, [FromBody] BusSchedule busSchedule)
        {
            bool result = await _busScheduleService.UpdateBusSchedule(id, busSchedule);
            if (!result)
                return NotFound();
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBusSchedule(int id)
        {
            bool result = await _busScheduleService.DeleteBusSchedule(id);
            if (!result)
                return NotFound();
            return NoContent();
        }
    }
}
