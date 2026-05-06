import { Outlet, useLocation } from 'react-router-dom';
import OfficesSidebar from './components/OfficesSidebar';

export default function MunicipalOfficesLayout() {
  const location = useLocation();
  const isDeepPage = location.pathname !== '/government/municipal-offices';
  return (
    <div className="flex min-h-screen flex-col md:flex-row bg-white">
      <aside
        className={`w-full md:w-64 shrink-0 border-r border-gray-200 bg-gray-50/50 ${
          isDeepPage ? 'hidden md:block' : 'block'
        }`}
      >
        <OfficesSidebar />
      </aside>
      <main className="flex-1 overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
}
