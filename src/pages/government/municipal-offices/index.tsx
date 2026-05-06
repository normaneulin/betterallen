import { Building2Icon, Phone, Globe, User2 } from 'lucide-react';
import yaml from 'js-yaml';
import SEO from '../../../components/SEO';
import { Heading } from '../../../components/ui/Heading';
import Banner from '../../../components/ui/Banner';
import { officeIcons } from '../../../lib/officeIcons';

// Statically import the YAML file as raw text
import municipalOfficesYaml from "../../../../content/government/municipal-offices/index.yaml?raw";

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

// Parse and sort the data statically outside the component cycle
let parsedOffices: Office[] = [];
try {
  const parsed = yaml.load(municipalOfficesYaml);
  parsedOffices = Array.isArray(parsed) ? parsed : [];
} catch (e) {
  console.warn("Failed to parse municipal offices YAML", e);
}

const sortedOffices = parsedOffices.sort((a, b) =>
  formatGovName(a.office_name).localeCompare(formatGovName(b.office_name))
);

export default function MunicipalOffices() {
  return (
    <div className="p-4 md:p-6 space-y-12 max-w-7xl mx-auto">
      <SEO title="Municipal Offices" description="Directory of municipal offices." />
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