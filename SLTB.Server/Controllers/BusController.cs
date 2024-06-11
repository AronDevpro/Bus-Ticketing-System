using Microsoft.AspNetCore.Mvc;
using SLTB.Server.Models;
using SLTB.Server.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SLTB.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BusController : ControllerBase
    {
        private readonly IBusService _busService;

        public BusController(IBusService busService)
        {
            _busService = busService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Bus>>> GetBuses()
        {
            var buses = await _busService.GetBusesAsync();
            return Ok(buses);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Bus>> GetBus(int id)
        {
            var bus = await _busService.GetBusByIdAsync(id);
            if (bus == null)
                return NotFound();

            return bus;
        }

        [HttpPost]
        public async Task<ActionResult<Bus>> CreateBus([FromBody] Bus bus)
        {
            var createdBus = await _busService.CreateBusAsync(bus);
            return CreatedAtAction(nameof(GetBus), new { id = createdBus.Id }, createdBus);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBus(int id, [FromBody] Bus bus)
        {
            var result = await _busService.UpdateBusAsync(id, bus);
            if (!result)
                return NotFound();

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBus(int id)
        {
            var result = await _busService.DeleteBusAsync(id);
            if (!result)
                return NotFound();

            return NoContent();
        }
    }
}
