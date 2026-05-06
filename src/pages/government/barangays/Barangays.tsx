import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, MapPin, Phone, User2 } from 'lucide-react';
import yaml from 'js-yaml';

import { Card, CardContent } from '@bettergov/kapwa/card';
import SEO from '../../../components/SEO';
import { Heading } from '../../../components/ui/Heading';
import Banner from '../../../components/ui/Banner';

function toTitleCase(str: string) {
  if (!str) return '';
  return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

interface BarangayOfficial {
  role: string;
  name: string | null;
  contact?: string | null;
  email?: string | null;
}

interface Barangay {
  slug: string;
  barangay_name: string;
  address?: string | null;
  trunkline?: string[] | null;
  website?: string | null;
  officials: BarangayOfficial[];
}

export default function Barangays() {
  const [barangays, setBarangays] = useState<Barangay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const resp = await fetch('/content/government/barangays/index.yaml');
        const text = await resp.text();
        const parsed = yaml.load(text);
        setBarangays(Array.isArray(parsed) ? parsed : []);
      } catch {
        setError('Failed to load barangays data');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const filtered = useMemo(() => {
    return barangays
      .filter(b =>
        b.barangay_name &&
        b.barangay_name.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => a.barangay_name.localeCompare(b.barangay_name));
  }, [barangays, search]);

  return (
    <div className="p-4 md:p-6 space-y-12 max-w-7xl mx-auto">
      <SEO title="Barangays" description="Directory of barangays in the municipality." />

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
          <Heading level={2}>Barangays</Heading>
          <p className="text-gray-500 mt-2 text-sm">
            Local government units within the municipality, led by elected officials
            who manage community-level services and programs.
          </p>
        </div>
      </div>

      <div className="mb-8 flex flex-col md:flex-row md:items-center gap-4">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search barangays..."
          className="w-full md:w-72 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-200"
        />
        <span className="text-xs text-gray-500 font-bold tracking-widest uppercase">
          {filtered.length} barangays
        </span>
      </div>

      {loading ? (
        <Banner type="info" description="Loading barangays..." />
      ) : error ? (
        <Banner type="error" description={error} />
      ) : filtered.length === 0 ? (
        <Banner type="info" description="No barangay data available." />
      ) : (
        <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((brgy, i) => {
            const punong = brgy.officials?.find(o =>
              o.role.includes('Punong Barangay')
            );

            return (
              <div
                key={brgy.slug || i}
                className="group flex h-full flex-col rounded-xl bg-gray-200 p-[2px] shadow-sm transition-all duration-300 hover:bg-gradient-to-r hover:from-[#357CBB] hover:to-[#CE1877] hover:shadow-xl hover:-translate-y-1.5"
              >
                <Card className="flex h-full flex-col bg-white border-transparent rounded-[10px]">
                  <CardContent className="flex h-full flex-col p-5">

                    {/* Top Row: Icon & Title */}
                    <div className="flex items-start gap-3">
                      <div className="border border-primary-100 bg-primary-50 text-primary-600 shrink-0 rounded-lg p-2.5 shadow-sm">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-gray-900 text-base font-bold leading-tight truncate">
                          {toTitleCase(brgy.barangay_name)}
                        </h3>
                        <p className="text-primary-600 mt-0.5 truncate text-[10px] font-bold tracking-widest uppercase">
                          Barangay
                        </p>
                      </div>
                    </div>

                    {/* Punong Barangay */}
                    {punong?.name ? (
                      <div className="flex items-center gap-2 border border-gray-100 bg-gray-50 rounded-xl px-3 py-2 mt-8">
                        <div className="bg-white text-gray-400 border border-gray-100 rounded-full p-1">
                          <User2 className="h-3.5 w-3.5" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-gray-400 mb-0.5 text-[9px] font-bold tracking-tighter uppercase">
                            Punong Barangay
                          </p>
                          <p className="text-primary-700 truncate text-xs leading-tight font-bold">
                            {toTitleCase(punong.name)}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="h-[46px]" aria-hidden="true" />
                    )}

                    {/* Contact */}
                    <div className="mt-auto flex items-center justify-between gap-4 border-t border-gray-100 pt-3 mt-4">
                      {punong?.contact ? (
                        <a
                          href={`tel:${punong.contact}`}
                          className="text-primary-600 flex items-center gap-1.5 text-[11px] font-medium hover:text-primary-800 transition-colors"
                        >
                          <Phone className="h-3 w-3" />
                          <span>{punong.contact}</span>
                        </a>
                      ) : (
                        <div className="text-gray-400 text-[10px] italic">No contact</div>
                      )}
                      <span className="text-primary-600 text-[10px] font-black tracking-tighter uppercase opacity-0 transition-opacity group-hover:opacity-100">
                        View Profile
                      </span>
                    </div>

                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}