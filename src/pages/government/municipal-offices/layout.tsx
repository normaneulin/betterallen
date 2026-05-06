import { Outlet } from 'react-router-dom';

export default function MunicipalOfficesLayout() {
  return (
    <div className="flex min-h-screen flex-col md:flex-row bg-white">
      <main className="flex-1 overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
}
