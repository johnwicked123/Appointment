using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;
using server.Services;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();
builder.Services.Configure<EmailSettings>(
    builder.Configuration.GetSection("EmailSettings"));

builder.Services.AddDbContext<AppointmentContext>(options =>
    options.UseInMemoryDatabase("AppointmentsDB"));
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddTransient<EmailService>();
builder.Services.AddScoped<IAppointmentService, AppointmentService>();


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular",
        builder => builder
            .WithOrigins("http://localhost:4200")
            .AllowAnyMethod()
            .AllowAnyHeader());
});

builder.WebHost.UseUrls("http://0.0.0.0:5000");

var app = builder.Build();

app.UseCors("AllowAngular");

app.UseSwagger();
app.UseSwaggerUI();



app.UseAuthorization();
app.MapControllers();
app.Run();
