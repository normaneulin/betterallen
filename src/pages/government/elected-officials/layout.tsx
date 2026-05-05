import { Outlet, useLocation } from 'react-router-dom';
import ElectedOfficialsSidebar from './components/ElectedOfficialsSidebar';

export default function ElectedOfficialsLayout() {
  const location = useLocation();

  // Logic: Hide the sidebar on mobile devices if the user is deep into a sub-page (like Committees)
  // so the content takes up the full screen. It will always show on desktop.
  const isDeepPage = location.pathname !== '/government/elected-officials';

  return (
    <div className="flex min-h-screen flex-col md:flex-row bg-white">
      {/* Sidebar Area */}
      <aside
        className={`w-full md:w-64 shrink-0 border-r border-gray-200 bg-gray-50/50 ${
          isDeepPage ? 'hidden md:block' : 'block'
        }`}
      >
        <ElectedOfficialsSidebar />
      </aside>

      {/* Main Content Area where ElectedOfficials.tsx or MunicipalCommittees.tsx renders */}
      <main className="flex-1 overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
}
