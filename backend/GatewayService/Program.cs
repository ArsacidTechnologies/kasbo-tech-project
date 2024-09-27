using Ocelot.DependencyInjection;
using Ocelot.Middleware;

var builder = WebApplication.CreateBuilder(args);

// Add Ocelot Configuration
builder.Configuration.AddJsonFile("ocelot.json", optional: false, reloadOnChange: true);

// Register Ocelot services
builder.Services.AddOcelot();

var app = builder.Build();

// Configure Ocelot middleware
app.UseOcelot().Wait();

app.Run();
