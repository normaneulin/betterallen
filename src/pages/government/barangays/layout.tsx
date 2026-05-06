import { Outlet, useLocation } from 'react-router-dom';
import BarangaysSidebar from './components/BarangaysSidebar';

export default function BarangaysLayout() {
  const location = useLocation();
  // Hide sidebar on mobile if deep page, always show on desktop
  const isDeepPage = location.pathname !== '/government/barangays';
  return (
    <div className="flex min-h-screen flex-col md:flex-row bg-white">
      <aside
        className={`w-full md:w-64 shrink-0 border-r border-gray-200 bg-gray-50/50 ${
          isDeepPage ? 'hidden md:block' : 'block'
        }`}
      >
        <BarangaysSidebar />
      </aside>
      <main className="flex-1 overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
}
