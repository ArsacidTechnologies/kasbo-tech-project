using candle_service.Models;
using Microsoft.EntityFrameworkCore;

namespace candle_service.Data
{
    public class CandleDbContext : DbContext
    {
        public CandleDbContext(DbContextOptions<CandleDbContext> options) : base(options)
        {
        }

        public DbSet<Candle> Candles { get; set; }
    }
}
