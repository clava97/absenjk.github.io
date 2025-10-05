import { StatCard } from '@/components/StatCard';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, FileText, XCircle } from 'lucide-react';
import { 
  mockDashboardStats, 
  mockDevices, 
  mockAttendanceRecords 
} from '@/lib/fakeData';
import { ConfidenceBadge } from '@/components/ConfidenceBadge';
import { getRelativeTime, getTimeDisplay } from '@/lib/datetime';

const Dashboard = () => {
  const stats = mockDashboardStats;
  const devices = mockDevices;
  const recentCheckIns = mockAttendanceRecords.slice(0, 5);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Ringkasan kehadiran dan status sistem hari ini
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Hadir Hari Ini"
          value={stats.present}
          icon={CheckCircle}
          variant="success"
          trend={{ value: 5.2, label: 'dari kemarin', isPositive: true }}
        />
        <StatCard
          title="Terlambat"
          value={stats.late}
          icon={Clock}
          variant="warning"
          trend={{ value: -2.1, label: 'dari kemarin', isPositive: true }}
        />
        <StatCard
          title="Izin/Cuti"
          value={stats.leave}
          icon={FileText}
          variant="default"
        />
        <StatCard
          title="Tidak Hadir"
          value={stats.absent}
          icon={XCircle}
          variant="danger"
          trend={{ value: 1.3, label: 'dari kemarin', isPositive: false }}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Device Status */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Status Perangkat</h2>
          <div className="space-y-3">
            {devices.map((device) => (
              <div
                key={device.id}
                className="flex items-center justify-between rounded-lg border p-3 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`h-3 w-3 rounded-full ${
                      device.status === 'online'
                        ? 'bg-success animate-pulse'
                        : 'bg-muted-foreground'
                    }`}
                  />
                  <div>
                    <p className="font-medium text-sm">{device.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {device.location}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge
                    variant={device.status === 'online' ? 'default' : 'secondary'}
                    className={
                      device.status === 'online'
                        ? 'bg-success-light text-success border-success/20'
                        : ''
                    }
                  >
                    {device.status === 'online' ? 'Online' : 'Offline'}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">
                    {getRelativeTime(device.lastSeen)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Check-ins */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Check-in Terbaru</h2>
          <div className="space-y-3">
            {recentCheckIns.map((record) => (
              <div
                key={record.id}
                className="flex items-center justify-between rounded-lg border p-3 hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1">
                  <p className="font-medium text-sm">{record.employeeName}</p>
                  <p className="text-xs text-muted-foreground">
                    {record.employeeNik} • {getTimeDisplay(record.timestamp)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {record.isLate && (
                    <Badge
                      variant="outline"
                      className="bg-warning-light text-warning border-warning/20 text-xs"
                    >
                      Terlambat
                    </Badge>
                  )}
                  <ConfidenceBadge confidence={record.confidence} showLabel={false} />
                  <Badge
                    variant={record.type === 'in' ? 'default' : 'secondary'}
                    className={
                      record.type === 'in'
                        ? 'bg-primary/10 text-primary border-primary/20'
                        : ''
                    }
                  >
                    {record.type === 'in' ? 'IN' : 'OUT'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Charts Placeholder */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Kehadiran 30 Hari Terakhir</h2>
          <div className="flex items-center justify-center h-64 bg-muted/30 rounded-lg border-2 border-dashed">
            <p className="text-sm text-muted-foreground">Chart: Line Chart (Recharts)</p>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Keterlambatan per Divisi</h2>
          <div className="flex items-center justify-center h-64 bg-muted/30 rounded-lg border-2 border-dashed">
            <p className="text-sm text-muted-foreground">Chart: Bar Chart (Recharts)</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
