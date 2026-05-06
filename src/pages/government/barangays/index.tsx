import { MapPinIcon, Phone, User2 } from 'lucide-react';
import yaml from 'js-yaml';
import { PageHero } from '@/components/layout/PageLayouts';
import { Card, CardContent } from '@/components/ui/Card';
import Banner from '@/components/ui/Banner';
import { toTitleCase } from '@/lib/stringUtils';

// Statically import the YAML file as raw text
// Note: Adjust the relative path if your folder depth differs
import barangaysYaml from '../../../../content/government/barangays/index.yaml?raw';

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

// Parse and sort the data statically outside the component cycle
let parsedBarangays: Barangay[] = [];
try {
  const parsed = yaml.load(barangaysYaml);
  parsedBarangays = Array.isArray(parsed) ? (parsed as Barangay[]) : [];
} catch (e) {
  console.warn('Failed to parse barangays YAML', e);
}

const sortedBarangays = parsedBarangays.sort((a, b) =>
  a.barangay_name.localeCompare(b.barangay_name)
);

export default function BarangaysIndex() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 md:px-8 lg:px-12">
      <PageHero
        title="Local Barangays"
        description={`${sortedBarangays.length} component barangays of the municipality.`}
      />

      {sortedBarangays.length === 0 ? (
        <Banner type="info" description="No barangays found." />
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {sortedBarangays.map(brgy => {
            const punong = brgy.officials?.find(o =>
              o.role && o.role.includes('Punong Barangay')
            );

            return (
              <div key={brgy.slug} className="h-full">
                <Card className="border border-gray-200 shadow-sm flex h-full flex-col rounded-xl bg-white">
                  <CardContent className="flex h-full flex-col space-y-4 p-4">
                    {/* Header Row */}
                    <div className="flex items-start gap-3">
                      <div className="bg-kapwa-bg-surface text-kapwa-text-brand border-kapwa-border-brand shrink-0 rounded-lg border p-2 shadow-sm">
                        <MapPinIcon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-kapwa-text-strong text-base leading-tight font-bold">
                          {toTitleCase(
                            brgy.barangay_name.replace('BARANGAY ', '')
                          )}
                        </h3>
                        <p className="text-kapwa-text-disabled mt-0.5 text-[10px] font-bold tracking-widest uppercase">
                          Barangay Profile
                        </p>
                      </div>
                    </div>

                    {/* Punong Barangay Row */}
                    <div className="border-kapwa-border-weak bg-kapwa-bg-surface-raised/50 flex items-center gap-2 rounded-xl border px-3 py-2">
                      <div className="border-kapwa-border-weak bg-kapwa-bg-surface text-kapwa-text-disabled shrink-0 rounded-full border p-1 shadow-sm">
                        <User2 className="h-3.5 w-3.5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-kapwa-text-disabled mb-0.5 text-[9px] leading-none font-bold tracking-tighter uppercase">
                          Punong Barangay
                        </p>
                        <p className="text-kapwa-text-support truncate text-xs leading-tight font-bold">
                          {punong?.name ? toTitleCase(punong.name) : 'Awaiting Data'}
                        </p>
                      </div>
                    </div>

                    {/* Contact Footer */}
                    <div className="mt-auto flex items-center gap-4 border-t border-kapwa-border-weak pt-3">
                      {brgy.trunkline && brgy.trunkline.length > 0 ? (
                        <div className="text-kapwa-text-disabled flex items-center gap-1.5 text-[11px] font-medium">
                          <Phone className="text-kapwa-text-brand h-3 w-3" />
                          <span>{brgy.trunkline[0]}</span>
                        </div>
                      ) : (
                        <div className="text-kapwa-text-support text-[10px] italic">
                          No contact listed
                        </div>
                      )}
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