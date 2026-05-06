import { Link, useLocation } from 'react-router-dom';
import { BookOpenIcon, BuildingIcon } from 'lucide-react';
import classNames from 'classnames';

const navItems = [
  {
    label: 'Elected Officials',
    icon: BuildingIcon,
    path: '/government/elected-officials',
  },
  {
    label: 'Committees',
    icon: BookOpenIcon,
    path: '/government/elected-officials/committees',
  },
];

export default function ElectedOfficialsNav() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-4 mt-12 shadow-sm w-fit mx-auto">
      <div>
        <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500">
          Municipal Government
        </p>
      </div>
      <div className="flex gap-2">
        {navItems.map(item => {
          const isActive = currentPath === item.path;
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={classNames(
                'flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-bold tracking-widest uppercase transition-all',
                isActive
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-gray-200 text-gray-600 hover:border-primary-400 hover:text-primary-600'
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
