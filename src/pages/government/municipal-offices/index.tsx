import { Building2Icon, Phone, User2 } from 'lucide-react';
import SEO from '../../../components/SEO';
import { Heading } from '../../../components/ui/Heading';
import Banner from '../../../components/ui/Banner';
import { officeIcons } from '../../../lib/officeIcons';
import {
  municipalOffices,
  type MunicipalOffice,
} from '../../../data/yamlLoader';

function toTitleCase(str: string) {
  if (!str) return '';
  return str.replace(
    /\w\S*/g,
    txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
}

function formatGovName(name: string) {
  return name.replace(/MUNICIPAL |LOCAL |DEPARTMENT OF /gi, '').trim();
}

const sortedOffices = (municipalOffices as MunicipalOffice[])
  .slice()
  .sort((a, b) =>
    formatGovName(a.office_name).localeCompare(formatGovName(b.office_name))
  );

export default function MunicipalOffices() {
  return (
    <div className="p-4 md:p-6 space-y-12 max-w-7xl mx-auto">
      <SEO
        title="Municipal Offices"
        description="Directory of municipal offices."
      />
      <div className="center-content max-w-3xl mx-auto text-center">
        <Heading level={2}>Municipal Offices</Heading>
        <p className="text-gray-500 mt-2 text-sm">
          Directory of local government offices and departments.
        </p>
      </div>

      <div className="mb-8 flex flex-col md:flex-row md:items-center gap-4">
        <span className="text-xs text-gray-500 font-bold tracking-widest uppercase">
          {sortedOffices.length} active offices
        </span>
      </div>

      {sortedOffices.length === 0 ? (
        <Banner type="info" description="No municipal office data available." />
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {sortedOffices.map((office, i) => {
            const Icon = officeIcons[office.slug] || Building2Icon;
            return (
              <div
                key={office.slug || i}
                className="group flex h-full flex-col bg-white border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all rounded-xl"
              >
                <div className="flex items-start gap-3 p-5 pb-2">
                  <div className="border border-primary-100 bg-primary-50 text-primary-600 shrink-0 rounded-lg p-2.5 shadow-sm">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-gray-900 text-lg font-bold leading-tight wrap-break-word">
                      {toTitleCase(formatGovName(office.office_name))}
                    </h3>
                    <p className="text-primary-700 mt-1 text-xs font-bold tracking-widest uppercase wrap-break-word">
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
                      <p className="text-gray-500 mb-0.5 text-[10px] font-bold tracking-tighter uppercase">
                        Department Head
                      </p>
                      <p className="text-black text-sm leading-tight font-bold">
                        {toTitleCase(office.department_head.name)}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="h-11.5 mx-5" aria-hidden="true" />
                )}
                {/* Contact & Website */}
                <div className="mt-auto flex items-center justify-between gap-4 border-t border-gray-100 pt-3 px-5 pb-4">
                  {office.department_head?.contact ? (
                    <a
                      href={`tel:${office.department_head.contact}`}
                      className="text-black flex items-center gap-1.5 text-sm font-semibold hover:text-primary-800 transition-colors"
                    >
                      <Phone className="h-3 w-3" />
                      <span>{office.department_head.contact}</span>
                    </a>
                  ) : (
                    <div className="text-gray-500 text-xs italic">
                      No contact
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
