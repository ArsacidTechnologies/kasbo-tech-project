using candle_service.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace candle_service.Services
{
    public interface ICandleService
    {
        Task<IEnumerable<Candle>> GetCandlesAsync();
        Task<Candle> GetCandleByIdAsync(int id);
        Task AddCandleAsync(Candle candle);
    }
}