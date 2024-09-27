using CandleService.Models;
using Microsoft.EntityFrameworkCore;

namespace CandleService.Data
{
    public class CandleDbContext : DbContext
    {
        public CandleDbContext(DbContextOptions<CandleDbContext> options) : base(options)
        {
        }

        public DbSet<Candle> Candles { get; set; }
    }
}
