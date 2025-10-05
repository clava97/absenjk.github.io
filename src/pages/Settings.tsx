import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { Settings as SettingsIcon, Save, Key } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useUIStore } from '@/stores/ui';
import { toast } from '@/hooks/use-toast';

const Settings = () => {
  const { theme } = useUIStore();

  const handleSave = () => {
    toast({
      title: 'Pengaturan Disimpan',
      description: 'Semua perubahan telah berhasil disimpan',
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold">Pengaturan</h1>
        <p className="text-muted-foreground mt-1">
          Konfigurasi sistem face recognition dan preferensi aplikasi
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Face Recognition Settings */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <SettingsIcon className="h-5 w-5" />
            <h2 className="text-lg font-semibold">Face Recognition</h2>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Threshold Confidence</Label>
              <div className="flex items-center gap-4">
                <Slider defaultValue={[75]} max={100} step={5} className="flex-1" />
                <span className="font-mono text-sm text-muted-foreground w-12">
                  75%
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Minimum confidence untuk verifikasi wajah
              </p>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label>Durasi Buka Pintu (detik)</Label>
              <Input type="number" defaultValue={5} min={1} max={30} />
              <p className="text-xs text-muted-foreground">
                Lama pintu tetap terbuka setelah verifikasi
              </p>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Anti-Spoof Detection</Label>
                <p className="text-xs text-muted-foreground">
                  Deteksi foto atau video palsu
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Log Semua Attempt</Label>
                <p className="text-xs text-muted-foreground">
                  Simpan percobaan gagal ke database
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </Card>

        {/* API & Integration */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Key className="h-5 w-5" />
            <h2 className="text-lg font-semibold">API & Integrasi</h2>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Webhook URL (Opsional)</Label>
              <Input
                type="url"
                placeholder="https://example.com/webhook"
              />
              <p className="text-xs text-muted-foreground">
                URL untuk notifikasi real-time check-in/out
              </p>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label>Email Notifications</Label>
              <Input
                type="email"
                placeholder="admin@company.com"
              />
              <p className="text-xs text-muted-foreground">
                Email untuk laporan harian dan alert
              </p>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Kirim Laporan Harian</Label>
                <p className="text-xs text-muted-foreground">
                  Email otomatis setiap hari pukul 17:00 WIB
                </p>
              </div>
              <Switch />
            </div>
          </div>
        </Card>

        {/* Appearance */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-6">Tampilan</h2>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Dark Mode</Label>
                <p className="text-xs text-muted-foreground">
                  Saat ini: {theme === 'dark' ? 'Dark' : 'Light'} Mode
                </p>
              </div>
              <ThemeToggle />
            </div>

            <Separator />

            <div className="space-y-2">
              <Label>Bahasa</Label>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                <option value="id">Bahasa Indonesia</option>
                <option value="en">English</option>
              </select>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label>Timezone</Label>
              <Input value="Asia/Jakarta (WIB)" disabled />
              <p className="text-xs text-muted-foreground">
                Zona waktu untuk semua timestamp
              </p>
            </div>
          </div>
        </Card>

        {/* System Info */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-6">Informasi Sistem</h2>

          <div className="space-y-4">
            <div className="flex justify-between py-2 border-b">
              <span className="text-sm text-muted-foreground">Versi Aplikasi</span>
              <span className="text-sm font-medium">v1.0.0</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-sm text-muted-foreground">Build Date</span>
              <span className="text-sm font-medium font-mono">2025-10-05</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-sm text-muted-foreground">Total Karyawan</span>
              <span className="text-sm font-medium">58</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-sm text-muted-foreground">Total Devices</span>
              <span className="text-sm font-medium">3</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-sm text-muted-foreground">Database Size</span>
              <span className="text-sm font-medium">234 MB</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button size="lg" className="gap-2" onClick={handleSave}>
          <Save className="h-4 w-4" />
          Simpan Pengaturan
        </Button>
      </div>
    </div>
  );
};

export default Settings;
