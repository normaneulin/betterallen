import { Outlet } from 'react-router-dom';
import ElectedOfficialsSidebar from './components/ElectedOfficialsSidebar';

export default function ElectedOfficialsLayout() {
  return (
    // Stack vertically on mobile (sidebar becomes a top strip),
    // side-by-side on md+.
    <div className="flex min-h-screen flex-col md:flex-row bg-white">
      {/*
        ElectedOfficialsSidebar renders:
          • mobile  → a sticky horizontal pill-tab strip at the top
          • desktop → the original sticky vertical sidebar (w-64)
        The aside wrapper here is only for the desktop border/bg.
      */}
      <div className="w-full md:w-64 md:shrink-0 md:border-r md:border-gray-200 md:bg-gray-50/50">
        <ElectedOfficialsSidebar />
      </div>

      <main className="flex-1 min-w-0 overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
}