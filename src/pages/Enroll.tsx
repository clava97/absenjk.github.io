import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Camera,
  CheckCircle,
  XCircle,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Enroll = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [samples, setSamples] = useState<
    Array<{ id: number; quality: 'good' | 'blur' | 'low-light' }>
  >([]);

  const totalSteps = 3;
  const requiredSamples = 10;

  const handleCapture = () => {
    if (samples.length >= requiredSamples) {
      toast({
        title: 'Batas Maksimum',
        description: 'Sudah mencapai 10 sampel wajah',
        variant: 'destructive',
      });
      return;
    }

    // Simulate capture with random quality
    const qualities: Array<'good' | 'blur' | 'low-light'> = [
      'good',
      'good',
      'good',
      'blur',
      'low-light',
    ];
    const randomQuality = qualities[Math.floor(Math.random() * qualities.length)];

    setSamples([...samples, { id: samples.length + 1, quality: randomQuality }]);

    toast({
      title: 'Sampel Ditangkap',
      description: `Kualitas: ${randomQuality === 'good' ? 'Baik' : randomQuality === 'blur' ? 'Blur' : 'Kurang Cahaya'}`,
    });
  };

  const getQualityIcon = (quality: string) => {
    switch (quality) {
      case 'good':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'blur':
        return <AlertCircle className="h-4 w-4 text-warning" />;
      case 'low-light':
        return <XCircle className="h-4 w-4 text-danger" />;
      default:
        return null;
    }
  };

  const getQualityBadge = (quality: string) => {
    const variants = {
      good: 'bg-success-light text-success border-success/20',
      blur: 'bg-warning-light text-warning border-warning/20',
      'low-light': 'bg-danger-light text-danger border-danger/20',
    };
    const labels = {
      good: 'Baik',
      blur: 'Blur',
      'low-light': 'Kurang Cahaya',
    };
    return (
      <Badge variant="outline" className={variants[quality as keyof typeof variants]}>
        {labels[quality as keyof typeof labels]}
      </Badge>
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold">Enroll Wajah</h1>
        <p className="text-muted-foreground mt-1">
          Daftarkan wajah karyawan untuk sistem face recognition
        </p>
      </div>

      {/* Progress Steps */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center flex-1">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 font-semibold transition-all ${
                  currentStep >= step
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-muted bg-muted text-muted-foreground'
                }`}
              >
                {step}
              </div>
              {step < totalSteps && (
                <div
                  className={`h-1 flex-1 mx-2 rounded-full transition-all ${
                    currentStep > step ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-sm font-medium">Ambil Sampel</p>
            <p className="text-xs text-muted-foreground mt-1">
              Capture 5-10 foto wajah
            </p>
          </div>
          <div>
            <p className="text-sm font-medium">Review Kualitas</p>
            <p className="text-xs text-muted-foreground mt-1">
              Periksa hasil capture
            </p>
          </div>
          <div>
            <p className="text-sm font-medium">Simpan</p>
            <p className="text-xs text-muted-foreground mt-1">
              Finalisasi enrollment
            </p>
          </div>
        </div>
      </Card>

      {/* Step Content */}
      {currentStep === 1 && (
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Camera */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Camera className="h-5 w-5" />
              Camera Preview
            </h2>
            <div className="aspect-video bg-muted/30 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center mb-4">
              <Camera className="h-12 w-12 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">Live camera feed</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Progress Sampling</p>
                <p className="text-sm text-muted-foreground font-mono">
                  {samples.length}/{requiredSamples}
                </p>
              </div>
              <Progress value={(samples.length / requiredSamples) * 100} />
              <Button
                onClick={handleCapture}
                className="w-full"
                disabled={samples.length >= requiredSamples}
              >
                <Camera className="mr-2 h-4 w-4" />
                Ambil Sampel Wajah
              </Button>
            </div>
          </Card>

          {/* Samples Gallery */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Sampel Terekam</h2>
            {samples.length === 0 ? (
              <div className="text-center py-12">
                <div className="h-16 w-16 rounded-full bg-muted mx-auto flex items-center justify-center mb-3">
                  <Camera className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Belum ada sampel
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Klik tombol untuk mulai capture
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-3">
                {samples.map((sample) => (
                  <div
                    key={sample.id}
                    className="relative aspect-square rounded-lg bg-muted border-2 overflow-hidden group"
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="text-2xl font-bold text-muted-foreground">
                        {sample.id}
                      </p>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
                      <div className="flex items-center justify-center gap-1">
                        {getQualityIcon(sample.quality)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      )}

      {currentStep === 2 && (
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Review Kualitas Sampel</h2>
          <div className="space-y-3">
            {samples.map((sample) => (
              <div
                key={sample.id}
                className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded bg-muted flex items-center justify-center font-bold">
                    {sample.id}
                  </div>
                  <div>
                    <p className="font-medium">Sampel #{sample.id}</p>
                    <p className="text-xs text-muted-foreground">Face sample</p>
                  </div>
                </div>
                {getQualityBadge(sample.quality)}
              </div>
            ))}
          </div>
        </Card>
      )}

      {currentStep === 3 && (
        <Card className="p-6">
          <div className="text-center py-12">
            <div className="h-20 w-20 rounded-full bg-success-light mx-auto flex items-center justify-center mb-4">
              <CheckCircle className="h-10 w-10 text-success" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Enrollment Berhasil!</h2>
            <p className="text-muted-foreground mb-6">
              {samples.length} sampel wajah telah disimpan ke database
            </p>
            <div className="flex gap-3 justify-center">
              <Button variant="outline" onClick={() => { setCurrentStep(1); setSamples([]); }}>
                Enroll Karyawan Lain
              </Button>
              <Button>Kembali ke Dashboard</Button>
            </div>
          </div>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Sebelumnya
        </Button>
        <Button
          onClick={() => {
            if (currentStep < totalSteps) {
              setCurrentStep(currentStep + 1);
            }
          }}
          disabled={currentStep === 1 && samples.length < 5}
        >
          {currentStep === totalSteps ? 'Selesai' : 'Selanjutnya'}
          {currentStep < totalSteps && <ChevronRight className="ml-2 h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
};

export default Enroll;
