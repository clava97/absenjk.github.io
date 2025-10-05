# Absensi Pro - Face Recognition System

Sistem absensi modern berbasis face recognition menggunakan React, Tailwind CSS, dan ESP32-CAM (mock).

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/react-18.3-blue.svg)
![TypeScript](https://img.shields.io/badge/typescript-5.0-blue.svg)

## 🚀 Fitur Utama

- **Dashboard Real-time**: Monitoring kehadiran dengan statistik lengkap
- **Kiosk Mode**: Interface fullscreen untuk face scanning
- **Riwayat Absensi**: Filter advanced dan export data (CSV)
- **Manajemen Karyawan**: CRUD karyawan dengan face enrollment tracking
- **Face Enrollment**: Wizard 3 langkah untuk mendaftarkan wajah
- **Settings**: Konfigurasi threshold, notifikasi, dan preferensi
- **Clock Display**: Jam real-time zona Asia/Jakarta (WIB) format Indonesia
- **Dark/Light Mode**: Toggle tema dengan persistensi di localStorage
- **Responsive Design**: Mobile-first, optimal di semua device
- **Accessibility**: WCAG AA compliant dengan keyboard navigation

## 🛠️ Tech Stack

- **Framework**: React 18 + TypeScript
- **Routing**: React Router v6
- **Styling**: Tailwind CSS 3
- **UI Components**: shadcn/ui + Radix UI
- **Icons**: Lucide React
- **State Management**: Zustand (UI state + theme)
- **Date/Time**: Native Intl.DateTimeFormat (zero dependencies)
- **Build Tool**: Vite

## 📦 Installation

```bash
# Clone repository
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌍 Timezone & Date Format

Aplikasi ini menggunakan zona waktu **Asia/Jakarta (WIB)** dengan format tanggal Indonesia.

### Format Clock Display
```
EEE, dd MMM yyyy • HH:mm:ss (WIB)
Contoh: Sen, 05 Okt 2025 • 14:30:45 (WIB)
```

### Cara Mengubah Timezone

Edit file `src/lib/datetime.ts`:

```typescript
const TIMEZONE = 'Asia/Jakarta'; // Ubah sesuai kebutuhan
const LOCALE = 'id-ID';          // Ubah untuk bahasa lain
```

Timezone options: `Asia/Jakarta`, `Asia/Kuala_Lumpur`, `Asia/Singapore`, dll.

## 📁 Struktur Proyek

```
src/
├── components/          # Reusable components
│   ├── ClockDisplay.tsx    # Real-time clock (WIB)
│   ├── Navbar.tsx          # Top navigation bar
│   ├── Sidebar.tsx         # Side navigation (collapsible)
│   ├── StatCard.tsx        # Dashboard stat cards
│   ├── ConfidenceBadge.tsx # Confidence indicator
│   ├── ThemeToggle.tsx     # Light/Dark toggle
│   ├── Layout.tsx          # Main layout wrapper
│   └── ui/                 # shadcn/ui components
├── pages/              # Route pages
│   ├── Dashboard.tsx       # Main dashboard
│   ├── Kiosk.tsx          # Face scanning kiosk
│   ├── Attendance.tsx     # Attendance history
│   ├── Employees.tsx      # Employee management
│   ├── Enroll.tsx         # Face enrollment wizard
│   ├── Settings.tsx       # App settings
│   └── NotFound.tsx       # 404 page
├── stores/             # Zustand stores
│   └── ui.ts              # UI state (theme, sidebar)
├── lib/                # Utilities
│   ├── datetime.ts        # Date/time helpers
│   ├── fakeData.ts        # Mock data
│   └── utils.ts           # General utilities
├── styles/
│   └── index.css          # Global styles + design tokens
├── App.tsx             # Main app with routing
└── main.tsx            # Entry point
```

## 🎨 Design System

### Colors (HSL)
- **Primary**: Indigo (#4F46E5) - Professional, trustworthy
- **Success**: Emerald (#10B981) - Present, verified
- **Warning**: Amber (#F59E0B) - Late, attention
- **Danger**: Rose (#EF4444) - Absent, error

### Typography
- **Font Family**: Inter
- **Heading**: Semibold
- **Body**: Regular

### Spacing & Shape
- **Radius**: 1rem (rounded-2xl)
- **Padding**: Generous, spacious
- **Shadow**: Soft elevation

## 🔗 Routing

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | Dashboard | Main dashboard with stats & charts |
| `/kiosk` | Kiosk | Fullscreen face scanning mode |
| `/attendance` | Attendance | Attendance history with filters |
| `/employees` | Employees | Employee CRUD management |
| `/enroll` | Enroll | Face enrollment wizard (3 steps) |
| `/settings` | Settings | System configuration |

## 🎯 Acceptance Criteria

✅ **Navbar**: Menampilkan jam realtime Asia/Jakarta dengan format Indonesia  
✅ **Responsive**: Optimal di mobile (≤375px) hingga desktop (≥1440px)  
✅ **Dark Mode**: Toggle tema dengan localStorage persistence  
✅ **Sidebar**: Collapsible (desktop) & off-canvas (mobile)  
✅ **Accessibility**: Keyboard navigation, focus states, ARIA labels  
✅ **Performance**: Fast load time, optimized Tailwind build  
✅ **Mock Data**: Dummy data untuk demo purposes  

## 🧪 Mock Data

Data dummy tersedia di `src/lib/fakeData.ts`:
- 5 karyawan sample
- 3 ESP32-CAM devices
- 4 attendance records
- Dashboard stats
- Chart data generators

## ♿ Accessibility

- Semua interaksi support keyboard navigation
- Focus ring visible untuk semua interactive elements
- ARIA labels untuk icon-only buttons
- Color contrast ratio memenuhi WCAG AA
- Semantic HTML (`<header>`, `<nav>`, `<main>`, `<footer>`)
- `aria-live` untuk clock display (screen reader friendly)

## 📱 Responsive Breakpoints

- **Mobile**: < 768px (off-canvas sidebar)
- **Tablet**: 768px - 1023px
- **Desktop**: ≥ 1024px (collapsible sidebar)
- **Large Desktop**: ≥ 1400px (max content width)

## 🔧 Configuration

### Tailwind Purge

Production build sudah dikonfigurasi untuk purge unused CSS:

```javascript
// tailwind.config.ts
content: [
  "./pages/**/*.{ts,tsx}",
  "./components/**/*.{ts,tsx}",
  "./app/**/*.{ts,tsx}",
  "./src/**/*.{ts,tsx}"
]
```

### Environment

Tidak ada environment variables yang diperlukan untuk saat ini. Semua konfigurasi hardcoded atau via localStorage.

## 🚧 Future Enhancements

- [ ] Integrasi real ESP32-CAM via WebSocket
- [ ] Backend API (authentication, database)
- [ ] Real-time notifications
- [ ] Advanced charts (Recharts integration)
- [ ] PDF report generator
- [ ] Multi-language support
- [ ] Email notifications
- [ ] Webhook integration

## 📄 License

Proprietary - Internal Use Only

## 👥 Support

Untuk bantuan atau pertanyaan:
- Email: support@absensipro.com
- Docs: [Link to documentation]

---

**Built with ❤️ using Lovable & React**
