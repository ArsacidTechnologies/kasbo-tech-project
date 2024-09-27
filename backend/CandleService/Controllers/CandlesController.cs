using candle_service.Models;
using candle_service.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace candle_service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CandlesController : ControllerBase
    {
        private readonly ICandleService _candleService;

        public CandlesController(ICandleService candleService)
        {
            _candleService = candleService;
        }

        [HttpGet]
        public async Task<IEnumerable<Candle>> GetCandles()
        {
            return await _candleService.GetCandlesAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Candle>> GetCandle(int id)
        {
            var candle = await _candleService.GetCandleByIdAsync(id);

            if (candle == null)
            {
                return NotFound();
            }

            return candle;
        }

        [HttpPost]
        public async Task<ActionResult<Candle>> PostCandle(Candle candle)
        {
            await _candleService.AddCandleAsync(candle);
            return CreatedAtAction(nameof(GetCandle), new { id = candle.Id }, candle);
        }
    }
}
