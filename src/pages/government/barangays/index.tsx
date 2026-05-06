import { MapPinIcon, User2 } from 'lucide-react';
import { PageHero } from '@/components/layout/PageLayouts';
import { Card, CardContent } from '@/components/ui/Card';
import Banner from '@/components/ui/Banner';
import { toTitleCase } from '@/lib/stringUtils';
import { barangays, type Barangay } from '@/data/yamlLoader';

const sortedBarangays = (barangays as Barangay[])
  .slice()
  .sort((a, b) => a.barangay_name.localeCompare(b.barangay_name));

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
            const punong = brgy.officials?.find(
              o => o.role && o.role.includes('Punong Barangay')
            );
            const skChair = brgy.officials?.find(
              o => o.role && o.role.includes('SK Chairperson')
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
                        <p className="text-kapwa-text-support mt-0.5 text-xs font-bold tracking-widest uppercase">
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
                        <p className="text-kapwa-text-support mb-0.5 text-[10px] leading-none font-bold tracking-tighter uppercase">
                          Punong Barangay
                        </p>
                        <p className="text-kapwa-text-support truncate text-sm leading-tight font-bold">
                          {punong?.name
                            ? toTitleCase(punong.name)
                            : 'Awaiting Data'}
                        </p>
                        {(punong?.contact || punong?.email) && (
                          <div className="mt-1 flex flex-col gap-0.5 text-[11px] text-kapwa-text-support">
                            {punong?.contact && (
                              <span className="truncate">{punong.contact}</span>
                            )}
                            {punong?.email && (
                              <span className="truncate">{punong.email}</span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* SK Chairperson Row */}
                    <div className="border-kapwa-border-weak bg-kapwa-bg-surface-raised/50 flex items-center gap-2 rounded-xl border px-3 py-2">
                      <div className="border-kapwa-border-weak bg-kapwa-bg-surface text-kapwa-text-disabled shrink-0 rounded-full border p-1 shadow-sm">
                        <User2 className="h-3.5 w-3.5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-kapwa-text-support mb-0.5 text-[10px] leading-none font-bold tracking-tighter uppercase">
                          SK Chairperson
                        </p>
                        <p className="text-kapwa-text-support truncate text-sm leading-tight font-bold">
                          {skChair?.name
                            ? toTitleCase(skChair.name)
                            : 'Awaiting Data'}
                        </p>
                        {(skChair?.contact || skChair?.email) && (
                          <div className="mt-1 flex flex-col gap-0.5 text-[11px] text-kapwa-text-support">
                            {skChair?.contact && (
                              <span className="truncate">
                                {skChair.contact}
                              </span>
                            )}
                            {skChair?.email && (
                              <span className="truncate">{skChair.email}</span>
                            )}
                          </div>
                        )}
                      </div>
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
