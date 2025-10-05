import { ReactNode, useEffect } from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { useUIStore } from '@/stores/ui';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { theme } = useUIStore();

  useEffect(() => {
    // Apply theme on mount
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  return (
    <div className="min-h-screen flex w-full bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col w-full">
        <Navbar />
        <main className="flex-1 p-6 lg:p-8">
          <div className="max-w-[1400px] mx-auto">
            {children}
          </div>
        </main>
        <footer className="border-t py-4 px-6">
          <div className="max-w-[1400px] mx-auto flex items-center justify-between text-sm text-muted-foreground">
            <p>© 2025 Absensi Pro • Face Recognition System</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-foreground transition-colors">
                Bantuan
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Dokumentasi
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};
