import { Link, Outlet, useLocation, Navigate } from 'react-router-dom';
import { UsersIcon, Building2Icon, HomeIcon, ChevronRight } from 'lucide-react';
import { Heading } from '../components/ui/Heading';
import { Text } from '../components/ui/Text';
import SEO from '../components/SEO';
import Section from '../components/ui/Section';
import classNames from 'classnames';
import ElectedOfficialsNav from '../components/government/ElectedOfficialsNav';

const branches = [
  {
    title: 'Elected Officials',
    description:
      'The elected leadership of the Executive and Legislative branches, responsible for policy implementation and law-making.',
    icon: UsersIcon,
    path: '/government/elected-officials',
    category: 'Leadership',
  },
  {
    title: 'Municipal Offices',
    description:
      'Municipal departments and agencies responsible for specific areas of governance.',
    icon: Building2Icon,
    path: '/government/municipal-offices',
    category: 'Administrative',
  },
  {
    title: 'Barangays',
    description:
      'Local government units within the municipality, led by elected officials who manage community-level services and programs.',
    icon: HomeIcon,
    path: '/government/barangays',
    category: 'Local Units',
  },
];

const Government: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const isElectedOfficialsRoute = currentPath.startsWith(
    '/government/elected-officials'
  );

  // FIX: Safety Redirect. If user hits exactly /government, bounce them to elected-officials
  if (currentPath === '/government' || currentPath === '/government/') {
    return <Navigate to="/government/elected-officials" replace />;
  }

  // Fallback for the environment variable to prevent TS errors if it's undefined
  const govName = import.meta.env.VITE_GOVERNMENT_NAME || 'our municipality';

  return (
    <>
      <SEO
        title="Government"
        description={`Access information on elected leaders, municipal departments, and the component barangays of ${govName}.`}
        keywords="government, elected officials, municipal offices, barangays, local government"
      />
      <Section className="p-3 mb-12">
        <Heading level={1} className="mb-2">
          Government
        </Heading>
        <Text className="mb-8 text-gray-600">
          Access information on elected leaders, municipal departments, and the
          component barangays of {govName}.
        </Text>

        {/* ── Desktop grid (md+) ── */}
        <div className="hidden md:grid grid-cols-3 gap-4">
          {branches.map(branch => {
            const isActive = currentPath.startsWith(branch.path);
            const Icon = branch.icon;
            return (
              <Link
                key={branch.path}
                to={branch.path}
                className={classNames(
                  'group relative flex min-h-40 flex-col justify-between rounded-2xl border-2 p-4 transition-all duration-300',
                  isActive
                    ? 'bg-primary-100 border-primary-500 shadow-lg text-primary-900'
                    : 'hover:border-primary-500 border-gray-200 bg-white text-gray-900 shadow-sm hover:shadow-md'
                )}
                state={{ scrollToContent: true }}
              >
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <div
                      className={classNames(
                        'rounded-xl p-2.5 shadow-sm transition-colors',
                        isActive
                          ? 'bg-white/20 text-primary-900'
                          : 'bg-primary-50 text-primary-600 border-primary-500'
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <p
                      className={classNames(
                        'text-[10px] font-bold tracking-[0.2em] uppercase',
                        isActive ? 'text-primary-900' : 'text-gray-400'
                      )}
                    >
                      {branch.category}
                    </p>
                  </div>
                  <h3
                    className={classNames(
                      'text-xl leading-tight font-extrabold tracking-tight',
                      isActive ? 'text-primary-900' : 'text-gray-900'
                    )}
                  >
                    {branch.title}
                  </h3>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <p
                    className={classNames(
                      'line-clamp-2 pr-6 text-xs leading-relaxed font-medium',
                      isActive ? 'text-primary-900' : 'text-gray-500'
                    )}
                  >
                    {branch.description}
                  </p>
                  <ChevronRight
                    className={classNames(
                      'h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1',
                      isActive ? 'text-primary-900' : 'text-gray-400'
                    )}
                  />
                </div>
              </Link>
            );
          })}
        </div>

        {/* ── Mobile horizontal accordion (< md) ── */}
        {/*
          Layout: a flex row where the active tab expands (flex-1) and
          inactive tabs collapse to show only icon + rotated title.
          Horizontal transition is driven by flex-grow + CSS transition.
        */}
        <div className="flex md:hidden flex-row gap-2 h-44 overflow-hidden">
          {branches.map(branch => {
            const isActive = currentPath.startsWith(branch.path);
            const Icon = branch.icon;
            return (
              <Link
                key={branch.path}
                to={branch.path}
                state={{ scrollToContent: true }}
                aria-label={branch.title}
                aria-current={isActive ? 'page' : undefined}
                className={classNames(
                  'group relative flex flex-col rounded-2xl border-2 p-3 overflow-hidden',
                  // Horizontal expand/collapse via flex-grow
                  'transition-[flex-grow,background-color,border-color,box-shadow] duration-[400ms] ease-in-out',
                  isActive
                    ? 'flex-1 bg-primary-100 border-primary-500 shadow-lg'
                    : 'flex-[0_0_2.75rem] border-gray-200 bg-white shadow-sm hover:border-primary-400 hover:bg-primary-50/60'
                )}
              >
                {/* ── Collapsed state: centered icon + vertical label ── */}
                <div
                  className={classNames(
                    'absolute inset-0 flex flex-col items-center justify-right gap-2 pt-1',
                    'transition-opacity duration-300',
                    isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'
                  )}
                >
                  <div className="rounded-xl bg-primary-50 p-2 text-primary-600">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span
                    className="text-[9px] font-bold tracking-widest uppercase text-gray-500 whitespace-nowrap select-none"
                    style={{
                      writingMode: 'vertical-rl',
                      transform: 'rotate(180deg)',
                    }}
                  >
                    {branch.title}
                  </span>
                </div>

                {/* ── Expanded state: full card content ── */}
                <div
                  className={classNames(
                    'flex flex-col justify-between h-full min-w-0',
                    'transition-opacity duration-300',
                    isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  )}
                >
                  {/* Top row: icon + category badge */}
                  <div className="flex items-center justify-between gap-1">
                    <div className="rounded-xl bg-white/30 p-2 text-primary-900 shrink-0">
                      <Icon className="h-4 w-4" />
                    </div>
                    <p className="text-[9px] font-bold tracking-[0.15em] uppercase text-primary-700 whitespace-nowrap truncate">
                      {branch.category}
                    </p>
                  </div>

                  {/* Title */}
                  <h3 className="mt-2 text-sm leading-tight font-extrabold tracking-tight text-primary-900 line-clamp-2">
                    {branch.title}
                  </h3>

                  {/* Description + chevron */}
                  <div className="mt-auto flex items-end justify-between gap-1">
                    <p className="text-[10px] leading-snug font-medium text-primary-800 line-clamp-3 pr-1">
                      {branch.description}
                    </p>
                    <ChevronRight className="h-4 w-4 shrink-0 text-primary-700" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {isElectedOfficialsRoute && (
          <div className="mt-6">
            <ElectedOfficialsNav />
          </div>
        )}

        {/* Nested content area for subroutes */}
        <div className="">
          <Outlet />
        </div>
      </Section>
    </>
  );
};

export default Government;
