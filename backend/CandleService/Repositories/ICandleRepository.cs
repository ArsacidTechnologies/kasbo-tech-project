using candle_service.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace candle_service.Repositories
{
    public interface ICandleRepository
    {
        Task<IEnumerable<Candle>> GetAllCandlesAsync();
        Task<Candle> GetCandleByIdAsync(int id);
        Task AddCandleAsync(Candle candle);
        Task SaveAsync();
    }
}
