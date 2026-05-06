import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2Icon, Phone, Globe, User2, ChevronLeft } from 'lucide-react';
import yaml from 'js-yaml';
import SEO from '../../../components/SEO';
import { Heading } from '../../../components/ui/Heading';
import Banner from '../../../components/ui/Banner';
import { officeIcons } from '../../../lib/officeIcons';

interface Office {
  slug: string;
  office_name: string;
  website?: string;
  department_head?: {
    name: string;
    contact?: string;
  };
}

function toTitleCase(str: string) {
  if (!str) return '';
  return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

function formatGovName(name: string) {
  return name.replace(/MUNICIPAL |LOCAL |DEPARTMENT OF /gi, '').trim();
}

export default function MunicipalOffices() {
  const [offices, setOffices] = useState<Office[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const resp = await fetch('/content/government/municipal-offices/index.yaml');
        const text = await resp.text();
        const parsed = yaml.load(text);
        setOffices(Array.isArray(parsed) ? parsed : []);
      } catch {
        setError('Failed to load offices data');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const filtered = useMemo(() => {
    return offices
      .filter(
        o =>
          o.office_name &&
          o.office_name.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => formatGovName(a.office_name).localeCompare(formatGovName(b.office_name)));
  }, [offices, search]);

  return (
    <div className="p-4 md:p-6 space-y-12 max-w-7xl mx-auto">
      <SEO title="Municipal Offices" description="Directory of municipal offices." />
      <div>
        <div className="flex items-center gap-1.5 mb-4">
          <Link
            to="/government"
            className="text-primary-600 hover:text-primary-800 flex items-center gap-1 text-xs font-bold tracking-widest uppercase transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Government
          </Link>
        </div>
        <div className="center-content max-w-3xl mx-auto text-center">
          <Heading level={2}>Municipal Offices</Heading>
          <p className="text-gray-500 mt-2 text-sm">
            Directory of local government offices and departments.
          </p>
        </div>
      </div>

      <div className="mb-8 flex flex-col md:flex-row md:items-center gap-4">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search offices..."
          className="w-full md:w-72 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-200"
        />
        <span className="text-xs text-gray-500 font-bold tracking-widest uppercase">{filtered.length} active offices</span>
      </div>

      {loading ? (
        <Banner type="info" description="Loading offices..." />
      ) : error ? (
        <Banner type="error" description={error} />
      ) : filtered.length === 0 ? (
        <Banner type="info" description="No municipal office data available." />
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((office, i) => {
            const Icon = officeIcons[office.slug] || Building2Icon;
            return (
              <div
                key={office.slug || i}
                className="group flex h-full flex-col bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all rounded-xl"
              >
                <div className="flex items-start gap-3 p-5 pb-2">
                  <div className="border border-primary-100 bg-primary-50 text-primary-600 shrink-0 rounded-lg p-2.5 shadow-sm">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-gray-900 text-base font-bold leading-tight truncate">
                      {toTitleCase(formatGovName(office.office_name))}
                    </h3>
                    <p className="text-primary-600 mt-0.5 truncate text-[10px] font-bold tracking-widest uppercase">
                      {office.office_name}
                    </p>
                  </div>
                </div>
                {/* Department Head */}
                {office.department_head?.name ? (
                  <div className="flex items-center gap-2 border border-gray-100 bg-gray-50 rounded-xl mx-5 px-3 py-2 mt-2">
                    <div className="bg-white text-gray-400 border border-gray-100 rounded-full p-1">
                      <User2 className="h-3.5 w-3.5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-gray-400 mb-0.5 text-[9px] font-bold tracking-tighter uppercase">
                        Department Head
                      </p>
                      <p className="text-primary-700 truncate text-xs leading-tight font-bold">
                        {toTitleCase(office.department_head.name)}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="h-[46px] mx-5" aria-hidden="true" />
                )}
                {/* Contact & Website */}
                <div className="mt-auto flex items-center justify-between gap-4 border-t border-gray-100 pt-3 px-5 pb-4">
                  {office.department_head?.contact ? (
                    <a
                      href={`tel:${office.department_head.contact}`}
                      className="text-primary-600 flex items-center gap-1.5 text-[11px] font-medium hover:text-primary-800 transition-colors"
                    >
                      <Phone className="h-3 w-3" />
                      <span>{office.department_head.contact}</span>
                    </a>
                  ) : (
                    <div className="text-gray-400 text-[10px] italic">No contact</div>
                  )}
                  <div className="flex items-center gap-2">
                    {office.website && (
                      <a
                        href={office.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white text-primary-600 rounded-md p-1.5 border border-gray-100"
                        title="Website Available"
                      >
                        <Globe className="h-3.5 w-3.5" />
                      </a>
                    )}
                    <span className="text-primary-600 text-[10px] font-black tracking-tighter uppercase opacity-0 transition-opacity group-hover:opacity-100">
                      View Profile
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}