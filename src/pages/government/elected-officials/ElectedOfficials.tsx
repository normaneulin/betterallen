import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Landmark,
  Gavel,
  ShieldCheck,
  UserIcon,
  BookOpenIcon,
  Briefcase,
  ArrowRight,
  ChevronLeft,
  GlobeIcon,
  UsersIcon,
} from 'lucide-react';
import yaml from 'js-yaml';
import { Card, CardContent } from '@bettergov/kapwa/card';
import SEO from '../../../components/SEO';
import { Heading } from '../../../components/ui/Heading';
import executiveYaml from '../../../../content/government/elected-officials/executive/index.yaml?raw';
import legislativeYaml from '../../../../content/government/elected-officials/legislative/index.yaml?raw';

function toTitleCase(str: string) {
  if (!str) return '';
  return str.replace(
    /\w\S*/g,
    txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
}

interface ExecutiveOfficial {
  slug: string;
  name: string;
  role: string;
  office?: string;
  address?: string;
  contact?: {
    email?: string;
    phone?: string;
  };
  website?: string;
  isElected: boolean;
  personId?: string;
}

interface CouncilMember {
  name: string;
  position: string;
  contact?: {
    email?: string;
    phone?: string;
  };
  website?: string;
  personId?: string;
  committee_chair?: string[];
  committee_vice_chair?: string[];
  committee_member?: string[];
}

function ElectedLeaderCard({ leader }: { leader: ExecutiveOfficial }) {
  const isMayor =
    leader.slug.includes('mayor') && !leader.slug.includes('vice');
  const Icon = isMayor ? Landmark : Gavel;

  return (
    <Card className="group h-full bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="flex h-full flex-col items-center space-y-4 py-8 text-center">
        <div className="relative">
          <div
            className={`flex h-24 w-24 items-center justify-center rounded-full border-4 shadow-sm ${
              isMayor
                ? 'bg-white border-primary-500 text-primary-600'
                : 'bg-white text-gray-400 border-orange-400'
            }`}
          >
            <Icon className="h-10 w-10" />
          </div>
          {isMayor && (
            <div className="bg-primary-500 text-white absolute -right-1 -bottom-1 rounded-full border-2 border-white p-1.5 shadow-md">
              <ShieldCheck className="h-4 w-4" />
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-primary-600 text-[10px] font-bold tracking-widest uppercase mb-1.5">
            {leader.office || 'Elected Official'}
          </p>
          <h2 className="text-gray-900 text-xl leading-tight font-black mb-3">
            Hon. {toTitleCase(leader.name)}
          </h2>
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
              isMayor
                ? 'bg-primary-50 text-primary-700'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            {leader.role}
          </span>
        </div>

        {(leader.contact?.email || leader.contact?.phone) && (
          <div className="border-t border-gray-100 w-full pt-5 mt-2">
            <div className="flex flex-col gap-3 text-left">
              {leader.contact?.email && (
                <div className="flex items-center gap-3">
                  <div className="bg-gray-50 p-2 rounded-lg text-gray-400 border border-gray-100">
                    <Briefcase className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400">
                      Email Address
                    </p>
                    <a
                      href={`mailto:${leader.contact.email}`}
                      className="text-sm font-medium text-gray-900 hover:text-primary-600"
                    >
                      {leader.contact.email}
                    </a>
                  </div>
                </div>
              )}
              {leader.contact?.phone && (
                <div className="flex items-center gap-3">
                  <div className="bg-gray-50 p-2 rounded-lg text-gray-400 border border-gray-100">
                    <Briefcase className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400">
                      Office Line
                    </p>
                    <a
                      href={`tel:${leader.contact.phone}`}
                      className="text-sm font-medium text-gray-900 hover:text-primary-600"
                    >
                      {leader.contact.phone}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function CouncilMemberCard({ member }: { member: CouncilMember }) {
  const chairedCommittees = member.committee_chair || [];

  return (
    <Card className="group flex h-full flex-col bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all">
      <CardContent className="flex h-full flex-col space-y-4 p-5">
        {/* Row 1: Icon, Role, Name */}
        <div className="flex items-start gap-3">
          <div className="border border-primary-100 bg-primary-50 text-primary-600 shrink-0 rounded-lg p-2.5 shadow-sm">
            <UserIcon className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-primary-600 mb-0.5 text-[10px] font-bold tracking-widest uppercase">
              {member.position || 'Councilor'}
            </p>
            <h4 className="text-gray-900 text-base font-bold leading-tight">
              Hon. {toTitleCase(member.name)}
            </h4>
          </div>
        </div>

        {/* Row 2: Committee Chair box */}
        {chairedCommittees.length > 0 ? (
          <div className="bg-gray-50 flex flex-col gap-2 rounded-xl border border-gray-100 p-3">
            <div className="mb-1 flex items-center gap-2">
              <BookOpenIcon className="text-gray-400 h-3.5 w-3.5" />
              <span className="text-gray-500 text-[10px] font-bold tracking-widest uppercase">
                Committee Chair
              </span>
            </div>
            <ul className="flex flex-col gap-2">
              {chairedCommittees.map(committee => (
                <li
                  key={committee}
                  className="bg-white relative flex items-stretch gap-2.5 rounded-lg border border-gray-100 px-3 py-2 shadow-sm"
                >
                  <div
                    className="absolute left-1 top-1 bottom-1 w-1.5 rounded-full bg-gradient-to-b from-pink-500 via-purple-500 to-blue-400"
                    style={{ height: 'auto' }}
                  />
                  <span className="ml-3 text-gray-900 break-words text-xs font-bold leading-snug">
                    {toTitleCase(committee)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="flex-1" />
        )}

        {/* Row 3: Social footer (Checks if contact/email exists if website isn't used) */}
        {member.contact?.email && (
          <div className="border-t border-gray-100 mt-auto flex items-center justify-between pt-4">
            <span className="text-gray-400 text-[10px] font-bold tracking-wider uppercase">
              Contact
            </span>
            <a
              href={`mailto:${member.contact.email}`}
              className="hover:border-primary-500 hover:text-primary-600 text-gray-600 bg-gray-50 flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-1.5 shadow-sm transition-all"
            >
              <span className="text-[10px] font-bold tracking-wider uppercase">
                Email
              </span>
              <GlobeIcon className="h-3.5 w-3.5" />
            </a>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function ElectedOfficials() {
  const executiveList = useMemo<ExecutiveOfficial[]>(() => {
    try {
      const parsed = yaml.load(executiveYaml);
      if (Array.isArray(parsed)) return parsed as ExecutiveOfficial[];
      if (parsed && typeof parsed === 'object' && 'officials' in parsed)
        return (parsed as { officials: ExecutiveOfficial[] }).officials;
      return [];
    } catch {
      return [];
    }
  }, []);

  const legislativeList = useMemo<CouncilMember[]>(() => {
    try {
      const parsed = yaml.load(legislativeYaml);
      if (Array.isArray(parsed)) return parsed as CouncilMember[];
      if (parsed && typeof parsed === 'object' && 'officials' in parsed)
        return (parsed as { officials: CouncilMember[] }).officials;
      return [];
    } catch {
      return [];
    }
  }, []);

  const electedLeaders = useMemo(
    () => executiveList.filter(o => o.isElected !== false),
    [executiveList]
  );

  return (
    <div className="p-4 md:p-6 space-y-12 max-w-7xl mx-auto">
      <SEO
        title="Elected Officials"
        description="Meet the elected officials of the municipality."
      />

      {/* Rebuilt Page Hero */}
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
          <Heading level={2}>Elected Officials</Heading>
          <p className="text-gray-500 mt-2 text-sm">
            The elected leaders and legislative body of the Municipal
            Government.
          </p>
        </div>
      </div>

      {/* ── SECTION 1: EXECUTIVE BRANCH ── */}
      <section>
        <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
          <Landmark className="h-4 w-4 text-blue-500" />
          <p className="text-gray-500 text-[10px] font-bold tracking-widest uppercase">
            Executive Branch
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 text-xs">
          {electedLeaders.map((leader, idx) => (
            <ElectedLeaderCard
              key={leader.slug || leader.name || idx}
              leader={leader}
            />
          ))}
        </div>
      </section>

      {/* ── SECTION 2: LEGISLATIVE BRANCH ── */}
      {legislativeList.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
            <UsersIcon className="h-4 w-4 text-blue-500" />
            <p className="text-gray-500 text-[10px] font-bold tracking-widest uppercase">
              Sangguniang Bayan
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 items-stretch md:grid-cols-2 xl:grid-cols-3">
            {legislativeList.map((member, idx) => (
              <CouncilMemberCard key={member.name || idx} member={member} />
            ))}
          </div>

          {/* Link to committees */}
          <div className="border border-gray-200 bg-gray-50 mt-8 flex flex-col items-center justify-between gap-4 rounded-xl p-5 sm:flex-row shadow-sm">
            <div className="flex items-center gap-3">
              <BookOpenIcon className="text-gray-400 h-6 w-6 shrink-0" />
              <div>
                <p className="text-gray-900 text-sm font-bold">
                  Standing Committees
                </p>
                <p className="text-gray-500 text-xs mt-0.5">
                  View full committee assignments and member listings
                </p>
              </div>
            </div>
            <Link to="/government/elected-officials/committees">
              <button className="bg-white border border-gray-200 hover:border-primary-500 hover:text-primary-600 text-gray-700 px-4 py-2.5 rounded-lg text-xs font-bold tracking-widest uppercase flex items-center gap-2 transition-all shadow-sm">
                View Committees <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </Link>
          </div>
        </section>
      )}

      {/* ── SECTION 3: DEPARTMENTS BRIDGE ── */}
      <div className="border border-gray-200 bg-gradient-to-br from-gray-50 to-white flex flex-col items-center justify-between gap-5 rounded-2xl p-6 md:flex-row shadow-sm mt-12">
        <div className="flex items-center gap-4">
          <div className="bg-blue-50 text-blue-600 p-3 rounded-xl border border-blue-100 shrink-0">
            <Briefcase className="h-6 w-6" />
          </div>
          <div>
            <h4 className="text-gray-900 font-bold text-lg">
              Looking for Municipal Office Heads?
            </h4>
            <p className="text-gray-500 text-sm mt-1">
              Municipal Treasurer, Assessor, Engineer, and other service heads
              are listed in the directory.
            </p>
          </div>
        </div>
        <Link to="/government/municipal-offices">
          <button className="bg-white border border-gray-200 hover:border-primary-500 hover:text-primary-600 text-gray-700 px-5 py-3 rounded-xl text-xs font-bold tracking-widest uppercase flex items-center gap-2 transition-all shadow-sm">
            Go to Municipal Offices <ArrowRight className="h-4 w-4" />
          </button>
        </Link>
      </div>
    </div>
  );
}
