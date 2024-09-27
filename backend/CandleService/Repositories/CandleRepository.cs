using candle_service.Data;
using candle_service.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace candle_service.Repositories
{
    public class CandleRepository : ICandleRepository
    {
        private readonly CandleDbContext _context;

        public CandleRepository(CandleDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Candle>> GetAllCandlesAsync()
        {
            return await _context.Candles.ToListAsync();
        }

        public async Task<Candle> GetCandleByIdAsync(int id)
        {
            return await _context.Candles.FindAsync(id);
        }

        public async Task AddCandleAsync(Candle candle)
        {
            await _context.Candles.AddAsync(candle);
        }

        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}