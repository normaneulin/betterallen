import { Link, Outlet, useLocation, Navigate } from 'react-router-dom';
import { UsersIcon, Building2Icon, HomeIcon, ChevronRight } from 'lucide-react';
import { Heading } from '../components/ui/Heading';
import { Text } from '../components/ui/Text';
import SEO from '../components/SEO';
import Section from '../components/ui/Section';
import classNames from 'classnames';

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
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {branches.map(branch => {
            const isActive = currentPath.startsWith(branch.path);
            const Icon = branch.icon;
            return (
              <Link
                key={branch.path}
                to={branch.path}
                className={classNames(
                  'group relative flex min-h-[160px] flex-col justify-between rounded-2xl border-2 p-6 transition-all duration-300',
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
        {/* Nested content area for subroutes */}
        <div className="mt-10">
          <Outlet />
        </div>
      </Section>
    </>
  );
};

export default Government;
