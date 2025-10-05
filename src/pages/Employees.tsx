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
import { Plus, Search, Edit, Eye, MoreVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { mockEmployees } from '@/lib/fakeData';
import { getRelativeTime } from '@/lib/datetime';
import { toast } from '@/hooks/use-toast';

const Employees = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const employees = mockEmployees;

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.nik.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.division.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAction = (action: string, employee: any) => {
    toast({
      title: `${action} Karyawan`,
      description: `${action} untuk ${employee.name}`,
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Karyawan</h1>
          <p className="text-muted-foreground mt-1">
            Kelola data karyawan dan face enrollment
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Tambah Karyawan
        </Button>
      </div>

      {/* Search Bar */}
      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari nama, NIK, atau divisi..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </Card>

      {/* Table */}
      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>NIK</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>Divisi</TableHead>
                <TableHead>Jabatan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Face Data</TableHead>
                <TableHead>Last Check-in</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">
                    <p className="text-muted-foreground">
                      Tidak ada karyawan ditemukan
                    </p>
                  </TableCell>
                </TableRow>
              ) : (
                filteredEmployees.map((employee) => (
                  <TableRow key={employee.id} className="hover:bg-muted/50">
                    <TableCell className="font-mono text-sm">
                      {employee.nik}
                    </TableCell>
                    <TableCell className="font-medium">
                      {employee.name}
                    </TableCell>
                    <TableCell>{employee.division}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {employee.position}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          employee.status === 'active' ? 'default' : 'secondary'
                        }
                        className={
                          employee.status === 'active'
                            ? 'bg-success-light text-success border-success/20'
                            : 'bg-muted text-muted-foreground'
                        }
                      >
                        {employee.status === 'active' ? 'Aktif' : 'Tidak Aktif'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-2 flex-1 max-w-[80px] bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary transition-all"
                            style={{
                              width: `${(employee.enrolledFaces / 10) * 100}%`,
                            }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground font-mono">
                          {employee.enrolledFaces}/10
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {employee.lastCheckIn
                        ? getRelativeTime(employee.lastCheckIn)
                        : '—'}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => handleAction('Lihat', employee)}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            Lihat Detail
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleAction('Edit', employee)}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Data
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleAction('Enroll Face', employee)}
                          >
                            <Plus className="mr-2 h-4 w-4" />
                            Enroll Wajah
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Footer */}
        <div className="border-t p-4">
          <p className="text-sm text-muted-foreground">
            Total {filteredEmployees.length} karyawan
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Employees;
