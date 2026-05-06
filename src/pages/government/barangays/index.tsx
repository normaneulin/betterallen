import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPinIcon, Phone, User2 } from 'lucide-react';
import yaml from 'js-yaml';
import { PageHero } from '@/components/layout/PageLayouts';
import { Card, CardContent } from '@/components/ui/Card';
import SearchInput from '@/components/ui/SearchInput';
import Banner from '@/components/ui/Banner';
import { toTitleCase } from '@/lib/stringUtils';

interface Official {
  role: string;
  name: string | null;
  contact: string | null;
  email: string | null;
}

interface Barangay {
  slug: string;
  barangay_name: string;
  address: string | null;
  trunkline: string[] | null;
  website: string | null;
  officials: Official[] | null;
}

export default function BarangaysIndex() {
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
        
        if (Array.isArray(parsed)) {
          setBarangays(parsed as Barangay[]);
        } else {
          setBarangays([]);
        }
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
      .filter(
        b =>
          b.barangay_name &&
          b.barangay_name.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => a.barangay_name.localeCompare(b.barangay_name));
  }, [barangays, search]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 md:px-8 lg:px-12">
      <PageHero
        title='Local Barangays'
        description={`${filtered.length} component barangays of the municipality.`}
      >
        <SearchInput
          value={search}
          onChangeValue={setSearchTerm => setSearch(setSearchTerm)}
          placeholder='Search by name (e.g. Kinabranan)...'
          className='md:w-72'
        />
      </PageHero>

      {loading ? (
        <Banner type="info" description="Loading barangays..." />
      ) : error ? (
        <Banner type="error" description={error} />
      ) : filtered.length === 0 ? (
        <Banner type="info" description="No barangays found." />
      ) : (
        <div className='mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3'>
          {filtered.map(brgy => {
            const punong = brgy.officials?.find(o =>
              o.role && o.role.includes('Punong Barangay')
            );

            return (
              <Link
                key={brgy.slug}
                to={brgy.slug}
                className='group block h-full'
                aria-label={`View profile of Barangay ${brgy.barangay_name}`}
              >
                <div className="relative flex h-full flex-col rounded-xl bg-gray-200 p-[2px] shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5">
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#357CBB] to-[#CE1877] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <Card className='relative z-10 border-transparent flex h-full flex-col rounded-[10px] bg-white'>
                    <CardContent className='flex h-full flex-col space-y-4 p-4'>
                      <div className='flex items-start gap-3'>
                        <div className='bg-kapwa-bg-surface text-kapwa-text-brand border-kapwa-border-brand group-hover:bg-kapwa-bg-brand-default group-hover:text-kapwa-text-inverse shrink-0 rounded-lg border p-2 shadow-sm transition-colors'>
                          <MapPinIcon className='h-5 w-5' />
                        </div>
                        <div className='min-w-0 flex-1'>
                          <h3 className='group-hover:text-kapwa-text-brand text-kapwa-text-strong text-base leading-tight font-bold transition-colors'>
                            {toTitleCase(
                              brgy.barangay_name.replace('BARANGAY ', '')
                            )}
                          </h3>
                          <p className='text-kapwa-text-disabled mt-0.5 text-[10px] font-bold tracking-widest uppercase'>
                            Official Barangay Profile
                          </p>
                        </div>
                        <ArrowRight className='group-hover:text-kapwa-text-link text-kapwa-text-support mt-1 h-4 w-4 transition-all' />
                      </div>

                      <div className='border-kapwa-border-weak bg-kapwa-bg-surface-raised/50 flex items-center gap-2 rounded-xl border px-3 py-2'>
                        <div className='border-kapwa-border-weak bg-kapwa-bg-surface text-kapwa-text-disabled shrink-0 rounded-full border p-1 shadow-sm'>
                          <User2 className='h-3.5 w-3.5' />
                        </div>
                        <div className='min-w-0'>
                          <p className='text-kapwa-text-disabled mb-0.5 text-[9px] leading-none font-bold tracking-tighter uppercase'>
                            Punong Barangay
                          </p>
                          <p className='text-kapwa-text-support truncate text-xs leading-tight font-bold'>
                            {punong?.name ? toTitleCase(punong.name) : 'Awaiting Data'}
                          </p>
                        </div>
                      </div>

                      <div className='mt-auto flex items-center justify-between gap-4 border-t border-kapwa-border-weak pt-3'>
                        {brgy.trunkline && brgy.trunkline.length > 0 ? (
                          <div className='text-kapwa-text-disabled flex items-center gap-1.5 text-[11px] font-medium'>
                            <Phone className='text-kapwa-text-brand h-3 w-3' />
                            <span>{brgy.trunkline[0]}</span>
                          </div>
                        ) : (
                          <div className='text-kapwa-text-support text-[10px] italic'>
                            No contact listed
                          </div>
                        )}

                        <span className='text-kapwa-text-brand text-[10px] font-black tracking-tighter uppercase opacity-0 transition-opacity group-hover:opacity-100'>
                          View Profile
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}