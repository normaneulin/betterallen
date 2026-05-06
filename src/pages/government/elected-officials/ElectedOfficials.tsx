import { Link } from 'react-router-dom';
import {
  BookOpenIcon,
  Briefcase,
  ArrowRight,
  UsersIcon,
  Landmark,
} from 'lucide-react';
import SEO from '../../../components/SEO';
import { Heading } from '../../../components/ui/Heading';
import {
  executiveOfficials,
  legislativeOfficials,
  type ExecutiveOfficial,
  type LegislativeOfficial,
} from '../../../data/yamlLoader';
import ElectedLeaderCard from '../../../components/government/ElectedLeaderCard';
import CouncilMemberCard from '../../../components/government/CouncilMemberCard';

type CouncilMember = LegislativeOfficial;

export default function ElectedOfficials() {
  const executiveList = executiveOfficials as ExecutiveOfficial[];
  const legislativeList = legislativeOfficials as CouncilMember[];
  const electedLeaders = executiveList.filter(o => o.isElected !== false);

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
            Mobile  → 1 columns (compact council cards fit at ~160 px each)
            md      → 2 columns
            xl      → 3 columns
          */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-5 items-stretch">
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
            <Link
              to="/government/elected-officials/committees"
              className="w-full sm:w-auto"
            >
              <button className="w-full sm:w-auto bg-white border border-gray-200 hover:border-primary-500 hover:text-primary-600 text-gray-700 px-4 py-2.5 rounded-lg text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 transition-all shadow-sm">
                View Committees <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </Link>
          </div>
        </section>
      )}

      {/* ── SECTION 3: DEPARTMENTS BRIDGE ── */}
      <div className="border border-gray-200 bg-linear-to-br from-gray-50 to-white flex flex-col gap-4 rounded-2xl p-4 md:p-6 md:flex-row md:items-center md:justify-between shadow-sm">
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
        <Link
          to="/government/municipal-offices"
          className="w-full md:w-auto shrink-0"
        >
          <button className="w-full md:w-auto bg-white border border-gray-200 hover:border-primary-500 hover:text-primary-600 text-gray-700 px-4 md:px-5 py-2.5 md:py-3 rounded-xl text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 transition-all shadow-sm">
            Go to Municipal Offices <ArrowRight className="h-4 w-4" />
          </button>
        </Link>
      </div>
    </div>
  );
}
