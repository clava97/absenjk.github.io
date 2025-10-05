import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Download, Search, Filter, Calendar } from 'lucide-react';
import { mockAttendanceRecords } from '@/lib/fakeData';
import { ConfidenceBadge } from '@/components/ConfidenceBadge';
import { formatDateTime } from '@/lib/datetime';

const Attendance = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const records = mockAttendanceRecords;

  const filteredRecords = records.filter((record) =>
    record.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.employeeNik.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleExport = () => {
    // Mock CSV export
    const csv = [
      ['Timestamp', 'NIK', 'Nama', 'Type', 'Device', 'Confidence'],
      ...filteredRecords.map((r) => [
        formatDateTime(r.timestamp, { 
          year: 'numeric',
          month: '2-digit', 
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
        r.employeeNik,
        r.employeeName,
        r.type.toUpperCase(),
        r.deviceId,
        (r.confidence * 100).toFixed(1) + '%',
      ]),
    ]
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `attendance_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold">Riwayat Absensi</h1>
        <p className="text-muted-foreground mt-1">
          Lihat dan kelola data kehadiran karyawan
        </p>
      </div>

      {/* Filters Bar */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari nama atau NIK karyawan..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Rentang Tanggal</span>
            </Button>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">Filter</span>
            </Button>
            <Button variant="default" className="gap-2" onClick={handleExport}>
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export</span>
            </Button>
          </div>
        </div>
      </Card>

      {/* Table */}
      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="sticky left-0 bg-card z-10">Waktu</TableHead>
                <TableHead>NIK</TableHead>
                <TableHead>Nama Karyawan</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Device</TableHead>
                <TableHead>Confidence</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <p className="text-muted-foreground">Tidak ada data ditemukan</p>
                  </TableCell>
                </TableRow>
              ) : (
                filteredRecords.map((record) => (
                  <TableRow key={record.id} className="hover:bg-muted/50">
                    <TableCell className="sticky left-0 bg-card font-mono text-sm">
                      {formatDateTime(record.timestamp, {
                        day: '2-digit',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {record.employeeNik}
                    </TableCell>
                    <TableCell className="font-medium">
                      {record.employeeName}
                    </TableCell>
                    <TableCell>
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
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {record.deviceId}
                    </TableCell>
                    <TableCell>
                      <ConfidenceBadge confidence={record.confidence} />
                    </TableCell>
                    <TableCell>
                      {record.isLate ? (
                        <Badge
                          variant="outline"
                          className="bg-warning-light text-warning border-warning/20"
                        >
                          Terlambat
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="bg-success-light text-success border-success/20"
                        >
                          Tepat Waktu
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination Placeholder */}
        <div className="border-t p-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Menampilkan {filteredRecords.length} dari {records.length} data
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Attendance;
