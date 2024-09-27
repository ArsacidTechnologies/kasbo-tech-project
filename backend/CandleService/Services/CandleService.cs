using candle_service.Models;
using candle_service.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace candle_service.Services
{
    public class CandleService : ICandleService
    {
        private readonly ICandleRepository _candleRepository;

        public CandleService(ICandleRepository candleRepository)
        {
            _candleRepository = candleRepository;
        }

        public async Task<IEnumerable<Candle>> GetCandlesAsync()
        {
            return await _candleRepository.GetAllCandlesAsync();
        }

        public async Task<Candle> GetCandleByIdAsync(int id)
        {
            return await _candleRepository.GetCandleByIdAsync(id);
        }

        public async Task AddCandleAsync(Candle candle)
        {
            await _candleRepository.AddCandleAsync(candle);
            await _candleRepository.SaveAsync();
        }
    }
}