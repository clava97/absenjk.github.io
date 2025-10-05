import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Camera, Play, Square, UserCheck } from 'lucide-react';
import { ConfidenceBadge } from '@/components/ConfidenceBadge';
import { getTimeDisplay } from '@/lib/datetime';
import { toast } from '@/hooks/use-toast';

const Kiosk = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [lastScan, setLastScan] = useState<{
    name: string;
    nik: string;
    type: 'in' | 'out';
    confidence: number;
    timestamp: Date;
  } | null>(null);

  const handleToggleScan = () => {
    if (!isScanning) {
      setIsScanning(true);
      toast({
        title: 'Memulai Scanning',
        description: 'Posisikan wajah Anda di depan kamera',
      });

      // Simulate scan after 3 seconds
      setTimeout(() => {
        const mockScan = {
          name: 'Budi Santoso',
          nik: 'EMP001',
          type: 'in' as const,
          confidence: 0.94,
          timestamp: new Date(),
        };
        setLastScan(mockScan);
        setIsScanning(false);
        
        toast({
          title: 'Check-in Berhasil! ✓',
          description: `${mockScan.name} telah absen masuk`,
          variant: 'default',
        });
      }, 3000);
    } else {
      setIsScanning(false);
      toast({
        title: 'Scanning Dihentikan',
        variant: 'default',
      });
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold">Kiosk Mode</h1>
        <p className="text-muted-foreground mt-1">
          Scan wajah untuk absensi masuk/keluar
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Camera Preview */}
        <Card className="lg:col-span-2 p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Live Camera Feed
              </h2>
              <Badge
                variant={isScanning ? 'default' : 'secondary'}
                className={
                  isScanning
                    ? 'bg-danger-light text-danger border-danger/20 animate-pulse'
                    : ''
                }
              >
                {isScanning ? 'Recording' : 'Idle'}
              </Badge>
            </div>

            {/* Camera Placeholder */}
            <div className="relative aspect-video bg-muted/30 rounded-2xl border-2 border-dashed overflow-hidden">
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <Camera className="h-16 w-16 text-muted-foreground mb-4" />
                <p className="text-sm text-muted-foreground">
                  ESP32-CAM Video Stream Placeholder
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Live feed akan ditampilkan di sini
                </p>
              </div>

              {isScanning && (
                <>
                  {/* Scanning Animation */}
                  <div className="absolute inset-0 border-4 border-primary/50 rounded-2xl animate-pulse" />
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-64 h-64 border-2 border-primary rounded-2xl" />
                  </div>
                  {/* Scanning Line */}
                  <div className="absolute inset-x-0 top-0 h-1 bg-primary animate-pulse" style={{ animation: 'slide-down 2s ease-in-out infinite' }} />
                </>
              )}
            </div>

            {/* Control Button */}
            <Button
              onClick={handleToggleScan}
              size="lg"
              className="w-full"
              variant={isScanning ? 'destructive' : 'default'}
            >
              {isScanning ? (
                <>
                  <Square className="mr-2 h-5 w-5" />
                  Stop Scanning
                </>
              ) : (
                <>
                  <Play className="mr-2 h-5 w-5" />
                  Mulai Scanning
                </>
              )}
            </Button>
          </div>
        </Card>

        {/* Result Panel */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <UserCheck className="h-5 w-5" />
            Hasil Scan
          </h2>

          {lastScan ? (
            <div className="space-y-4">
              <div className="rounded-xl bg-success-light p-4 border border-success/20">
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-12 w-12 rounded-full bg-success/20 flex items-center justify-center">
                    <UserCheck className="h-6 w-6 text-success" />
                  </div>
                  <div>
                    <p className="font-semibold text-success">Verifikasi Berhasil</p>
                    <p className="text-xs text-success/80">{getTimeDisplay(lastScan.timestamp)}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-muted-foreground">Nama</p>
                    <p className="font-medium">{lastScan.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">NIK</p>
                    <p className="font-medium font-mono">{lastScan.nik}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Confidence</p>
                    <ConfidenceBadge confidence={lastScan.confidence} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Status</p>
                    <Badge className="bg-primary/10 text-primary border-primary/20">
                      Check {lastScan.type.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Anti-Spoof Indicator (Placeholder) */}
              <div className="rounded-lg border p-3">
                <p className="text-xs font-medium mb-2">Anti-Spoof Check</p>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-success" />
                  <p className="text-xs text-muted-foreground">Live Face Detected</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-3">
                <Camera className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">
                Belum ada hasil scan
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Klik tombol Mulai Scanning
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Kiosk;
