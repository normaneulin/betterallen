import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Landmark,
  Gavel,
  ShieldCheck,
  BookOpenIcon,
  Briefcase,
  ArrowRight,
  UsersIcon,
  Phone,
  Mail,
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
      <CardContent className="flex h-full flex-col items-center space-y-4 py-6 px-4 text-center">
        {/* Avatar */}
        <div className="relative">
          <div
            className={`flex h-20 w-20 md:h-24 md:w-24 items-center justify-center rounded-full border-4 shadow-sm ${
              isMayor
                ? 'bg-white border-primary-500 text-primary-600'
                : 'bg-white text-gray-400 border-orange-400'
            }`}
          >
            <Icon className="h-8 w-8 md:h-10 md:w-10" />
          </div>
          {isMayor && (
            <div className="bg-primary-500 text-white absolute -right-1 -bottom-1 rounded-full border-2 border-white p-1.5 shadow-md">
              <ShieldCheck className="h-4 w-4" />
            </div>
          )}
        </div>

        {/* Name / role */}
        <div className="min-w-0 flex-1 w-full">
          <p className="text-primary-600 text-[10px] font-bold tracking-widest uppercase mb-1.5">
            {leader.office || 'Elected Official'}
          </p>
          <h2 className="text-gray-900 text-lg md:text-xl leading-tight font-black mb-3">
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

        {/* Contact */}
        {(leader.contact?.email || leader.contact?.phone) && (
          <div className="border-t border-gray-100 w-full pt-4 mt-2">
            <div className="flex flex-col gap-3 text-left">
              {leader.contact?.phone && (
                <div className="flex items-center gap-3">
                  <div className="bg-gray-50 p-2 rounded-lg text-gray-400 border border-gray-100 shrink-0">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400">
                      Office Line
                    </p>
                    <a
                      href={`tel:${leader.contact.phone}`}
                      className="text-sm font-medium text-gray-900 hover:text-primary-600 break-all"
                    >
                      {leader.contact.phone}
                    </a>
                  </div>
                </div>
              )}
              {leader.contact?.email && (
                <div className="flex items-center gap-3">
                  <div className="bg-gray-50 p-2 rounded-lg text-gray-400 border border-gray-100 shrink-0">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400">
                      Email Address
                    </p>
                    <a
                      href={`mailto:${leader.contact.email}`}
                      className="text-sm font-medium text-gray-900 hover:text-primary-600 break-all"
                    >
                      {leader.contact.email}
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
      <CardContent className="flex h-full flex-col space-y-3 p-4 md:p-5">
        {/* Row 1: Position + Name */}
        <div>
          <p className="text-primary-600 mb-0.5 text-[10px] font-bold tracking-widest uppercase">
            {member.position || 'SB Member'}
          </p>
          <p className="text-gray-900 text-sm font-bold leading-tight">
            Hon. {toTitleCase(member.name)}
          </p>
        </div>

        {/* Row 2: Committee Chair List */}
        {chairedCommittees.length > 0 ? (
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <BookOpenIcon className="text-gray-400 h-3.5 w-3.5 shrink-0" />
              <span className="text-gray-500 text-[8px] font-bold tracking-widest uppercase">
                Committee Chair
              </span>
            </div>
            <ul className="flex flex-col gap-1 pl-5 list-disc marker:text-gray-300">
              {chairedCommittees.map(committee => (
                <li
                  key={committee}
                  className="text-gray-700 break-words text-[10px] font-medium leading-snug"
                >
                  {toTitleCase(committee)}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="flex-1" />
        )}

        {/* Row 3: Contact */}
        {(member.contact?.phone || member.contact?.email) && (
          <div className="border-t border-gray-100 mt-auto pt-3 flex flex-col gap-2">
            {member.contact?.phone && (
              <a
                href={`tel:${member.contact.phone}`}
                className="flex items-center gap-2 text-[10px] font-medium text-gray-900 hover:text-primary-600 transition-colors group"
              >
                <Phone className="h-3 w-3 text-gray-400 group-hover:text-primary-500 shrink-0 transition-colors" />
                {member.contact.phone}
              </a>
            )}
            {member.contact?.email && (
              <a
                href={`mailto:${member.contact.email}`}
                className="flex items-center gap-2 text-[10px] text-gray-500 hover:text-primary-600 transition-colors group"
              >
                <Mail className="h-3 w-3 text-gray-400 group-hover:text-primary-500 shrink-0 transition-colors" />
                <span className="truncate">{member.contact.email}</span>
              </a>
            )}
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
    <div className="p-4 md:p-6 space-y-10 md:space-y-12 max-w-7xl mx-auto">
      <SEO
        title="Elected Officials"
        description="Meet the elected officials of the municipality."
      />

      {/* Hero */}
      <div className="text-center">
        <Heading level={2}>Elected Officials</Heading>
        <p className="text-gray-500 mt-2 text-sm">
          The elected leaders and legislative body of the Municipal Government.
        </p>
      </div>

      {/* ── SECTION 1: EXECUTIVE BRANCH ── */}
      <section>
        <div className="flex items-center gap-3 border-b border-gray-100 pb-4 mb-5">
          <Landmark className="h-4 w-4 text-blue-500 shrink-0" />
          <p className="text-gray-500 text-[10px] font-bold tracking-widest uppercase">
            Executive Branch
          </p>
        </div>
        {/*
          Mobile  → single column
          sm      → 2 columns (mayor + vice mayor side by side)
          lg      → keeps 2 columns (cards are wide enough to read)
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
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
          <div className="flex items-center gap-3 mb-5 border-b border-gray-100 pb-4">
            <UsersIcon className="h-4 w-4 text-blue-500 shrink-0" />
            <p className="text-gray-500 text-[10px] font-bold tracking-widest uppercase">
              Sangguniang Bayan
            </p>
          </div>

          {/*
            Mobile  → 2 columns (compact council cards fit at ~160 px each)
            md      → 2 columns
            xl      → 3 columns
          */}
          <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-5 items-stretch">
            {legislativeList.map((member, idx) => (
              <CouncilMemberCard key={member.name || idx} member={member} />
            ))}
          </div>

          {/* Committees CTA */}
          <div className="border border-gray-200 bg-gray-50 mt-6 md:mt-8 flex flex-col gap-4 rounded-xl p-4 md:p-5 sm:flex-row sm:items-center sm:justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <BookOpenIcon className="text-gray-400 h-5 w-5 md:h-6 md:w-6 shrink-0" />
              <div>
                <p className="text-gray-900 text-sm font-bold">
                  Standing Committees
                </p>
                <p className="text-gray-500 text-xs mt-0.5">
                  View full committee assignments and member listings
                </p>
              </div>
            </div>
            <Link to="/government/elected-officials/committees" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto bg-white border border-gray-200 hover:border-primary-500 hover:text-primary-600 text-gray-700 px-4 py-2.5 rounded-lg text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 transition-all shadow-sm">
                View Committees <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </Link>
          </div>
        </section>
      )}

      {/* ── SECTION 3: DEPARTMENTS BRIDGE ── */}
      <div className="border border-gray-200 bg-gradient-to-br from-gray-50 to-white flex flex-col gap-4 rounded-2xl p-4 md:p-6 md:flex-row md:items-center md:justify-between shadow-sm">
        <div className="flex items-start gap-3 md:gap-4">
          <div className="bg-blue-50 text-blue-600 p-2.5 md:p-3 rounded-xl border border-blue-100 shrink-0">
            <Briefcase className="h-5 w-5 md:h-6 md:w-6" />
          </div>
          <div>
            <h4 className="text-gray-900 font-bold text-base md:text-lg">
              Looking for Municipal Office Heads?
            </h4>
            <p className="text-gray-500 text-xs md:text-sm mt-1">
              Municipal Treasurer, Assessor, Engineer, and other service heads
              are listed in the directory.
            </p>
          </div>
        </div>
        <Link to="/government/municipal-offices" className="w-full md:w-auto shrink-0">
          <button className="w-full md:w-auto bg-white border border-gray-200 hover:border-primary-500 hover:text-primary-600 text-gray-700 px-4 md:px-5 py-2.5 md:py-3 rounded-xl text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 transition-all shadow-sm">
            Go to Municipal Offices <ArrowRight className="h-4 w-4" />
          </button>
        </Link>
      </div>
    </div>
  );
}