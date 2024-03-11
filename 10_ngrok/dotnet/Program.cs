using Microsoft.AspNetCore.Http.HttpResults;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.MapGet("/date", context =>
{
    DateTime dateTime = DateTime.UtcNow;
    string htmlContent = $"<html><h1>Current date is:</h1><p>{dateTime}</p></html>";
    context.Response.Headers.Add("Content-Type", "text/html");
    return context.Response.WriteAsync(htmlContent);
});

app.Run();
