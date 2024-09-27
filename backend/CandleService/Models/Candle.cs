using System;

namespace candle_service.Models
{
    public class Candle
    {
        public int Id { get; set; }
        public decimal Open { get; set; }
        public decimal High { get; set; }
        public decimal Low { get; set; }
        public decimal Close { get; set; }
        public DateTime Timestamp { get; set; }
    }
}
