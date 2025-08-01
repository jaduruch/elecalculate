using System;
using System.Diagnostics;
using System.IO;
using System.IO.Compression;

Console.WriteLine("== Elecalculate Offline Self-Extractor ==");

string exeDir = AppContext.BaseDirectory;
string zipName = "elecalculate-offline-deployment.zip";
string zipPath = Path.Combine(exeDir, zipName);
string extractPath = Path.Combine(Path.GetTempPath(), $"elecalculate-offline-{Guid.NewGuid()}");

Console.WriteLine($"[INFO] Looking for ZIP: {zipPath}");
if (!File.Exists(zipPath))
{
    Console.ForegroundColor = ConsoleColor.Red;
    Console.WriteLine($"[ERROR] ZIP file not found: {zipPath}");
    Console.ResetColor();
    Console.WriteLine();
    Console.WriteLine("Press Enter to exit...");
    Console.ReadLine();
    return;
}

try
{
    Console.WriteLine($"[INFO] Creating extraction directory: {extractPath}");
    Directory.CreateDirectory(extractPath);

    Console.WriteLine("[INFO] Extracting ZIP...");
    ZipFile.ExtractToDirectory(zipPath, extractPath);
    Console.WriteLine("[SUCCESS] Extraction complete.");
}
catch (Exception ex)
{
    Console.ForegroundColor = ConsoleColor.Red;
    Console.WriteLine($"[ERROR] Failed to extract ZIP: {ex.Message}");
    Console.ResetColor();
    Console.WriteLine();
    Console.WriteLine("Press Enter to exit...");
    Console.ReadLine();
    return;
}

// Search for index.html anywhere in the extracted files
string? indexPath = Directory.GetFiles(extractPath, "index.html", SearchOption.AllDirectories).FirstOrDefault();

if (indexPath == null)
{
    Console.ForegroundColor = ConsoleColor.Red;
    Console.WriteLine("[ERROR] index.html not found in extracted files.");
    Console.ResetColor();
    Console.WriteLine();
    Console.WriteLine("Press Enter to exit...");
    Console.ReadLine();
    return;
}

try
{
    Console.WriteLine("[INFO] Launching index.html in your default browser...");
    var psi = new ProcessStartInfo
    {
        FileName = indexPath,
        UseShellExecute = true
    };
    Process.Start(psi);
    Console.ForegroundColor = ConsoleColor.Green;
    Console.WriteLine("[SUCCESS] index.html launched in your default browser.");
    Console.ResetColor();
}
catch (Exception ex)
{
    Console.ForegroundColor = ConsoleColor.Red;
    Console.WriteLine($"[ERROR] Failed to open browser: {ex.Message}");
    Console.ResetColor();
}

// Wait for user to press Enter before closing
Console.WriteLine();
Console.WriteLine("Press Enter to exit...");
Console.ReadLine();