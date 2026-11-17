using System;
using System.Diagnostics;
using System.IO;
using System.IO.Compression;
using System.Reflection;
using System.Linq;

Console.WriteLine("Elecalculate Offline - Self-Extractor\n");

string extractPath = Path.Combine(Path.GetTempPath(), $"elecalculate-offline-{Guid.NewGuid()}");

// Find the embedded ZIP resource
var assembly = Assembly.GetExecutingAssembly();
string? resourceName = assembly.GetManifestResourceNames()
    .FirstOrDefault(n => n.EndsWith("elecalculate-offline-deployment.zip", StringComparison.OrdinalIgnoreCase));

if (resourceName == null)
{
    Console.ForegroundColor = ConsoleColor.Red;
    Console.WriteLine("The embedded offline package could not be found in this application.");
    Console.ResetColor();
    Console.WriteLine("\nPress Enter to exit.");
    Console.ReadLine();
    return;
}

try
{
    Directory.CreateDirectory(extractPath);

    Console.WriteLine("Extracting offline package...");
    using var zipStream = assembly.GetManifestResourceStream(resourceName);
    if (zipStream == null)
        throw new Exception("Resource stream is null.");

    ZipFile.ExtractToDirectory(zipStream, extractPath);
}
catch (Exception ex)
{
    Console.ForegroundColor = ConsoleColor.Red;
    Console.WriteLine("Extraction failed.");
    Console.ResetColor();
    Console.WriteLine($"\nDetails: {ex.Message}");
    Console.WriteLine("\nPress Enter to exit.");
    Console.ReadLine();
    return;
}

// Find index.html anywhere in the extracted files
string? indexPath = Directory.GetFiles(extractPath, "index.html", SearchOption.AllDirectories).FirstOrDefault();

if (indexPath == null)
{
    Console.ForegroundColor = ConsoleColor.Red;
    Console.WriteLine("The main offline page (index.html) was not found after extraction.");
    Console.ResetColor();
    Console.WriteLine("\nPress Enter to exit.");
    Console.ReadLine();
    return;
}

try
{
    Console.WriteLine("Opening Elecalculate Offline in your default browser...");
    var psi = new ProcessStartInfo
    {
        FileName = indexPath,
        UseShellExecute = true
    };
    Process.Start(psi);
    Console.ForegroundColor = ConsoleColor.Green;
    Console.WriteLine("Elecalculate Offline is now open in your browser.");
    Console.ResetColor();
}
catch (Exception ex)
{
    Console.ForegroundColor = ConsoleColor.Red;
    Console.WriteLine("Could not open the offline page in your browser.");
    Console.ResetColor();
    Console.WriteLine($"\nDetails: {ex.Message}");
}

Console.WriteLine("\nYou may close this window.");
Console.ReadLine();