import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpenIcon, ChevronLeft, User2, UsersIcon } from 'lucide-react';
import yaml from 'js-yaml';

// 1. Use the Kapwa Card you already have installed
import { Card, CardContent } from '@bettergov/kapwa/card';
import { Heading } from '../../../components/ui/Heading';

import legislativeYaml from '../../../../content/government/elected-officials/legislative/index.yaml?raw';

// 2. Bring back your inline title case function
function toTitleCase(str: string) {
  return str.replace(
    /\w\S*/g,
    txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
}

// --- Types ---
interface LegislativeOfficial {
  name: string;
  position: string;
  committee_chair?: string[];
  committee_vice_chair?: string[];
  committee_member?: string[];
}

interface CommitteeMember {
  name: string;
  role?: string;
}

interface Committee {
  committee: string;
  chairperson: string;
  members?: CommitteeMember[];
}

export default function MunicipalCommitteesPage() {
  const [searchTerm] = useState('');

  const legislativeList = useMemo<LegislativeOfficial[]>(() => {
    try {
      const parsed = yaml.load(legislativeYaml);
      if (Array.isArray(parsed)) return parsed as LegislativeOfficial[];
      if (parsed && typeof parsed === 'object' && 'officials' in parsed)
        return (parsed as { officials: LegislativeOfficial[] }).officials;
      return [];
    } catch {
      return [];
    }
  }, []);

  const committees = useMemo(() => {
    const committeesMap = new Map<string, Committee>();

    legislativeList.forEach(official => {
      if (official.committee_chair) {
        official.committee_chair.forEach(c => {
          if (!committeesMap.has(c)) {
            committeesMap.set(c, {
              committee: c,
              chairperson: official.name,
              members: [],
            });
          } else {
            committeesMap.get(c)!.chairperson = official.name;
          }
        });
      }
    });

    legislativeList.forEach(official => {
      if (official.committee_vice_chair) {
        official.committee_vice_chair.forEach(c => {
          if (!committeesMap.has(c)) {
            committeesMap.set(c, {
              committee: c,
              chairperson: 'TBA',
              members: [],
            });
          }
          committeesMap
            .get(c)!
            .members!.push({ name: official.name, role: 'Vice Chairperson' });
        });
      }
      if (official.committee_member) {
        official.committee_member.forEach(c => {
          if (!committeesMap.has(c)) {
            committeesMap.set(c, {
              committee: c,
              chairperson: 'TBA',
              members: [],
            });
          }
          committeesMap
            .get(c)!
            .members!.push({ name: official.name, role: 'Member' });
        });
      }
    });

    return Array.from(committeesMap.values()).sort((a, b) =>
      a.committee.localeCompare(b.committee)
    );
  }, [legislativeList]);

  const filteredCommittees = useMemo(() => {
    const q = searchTerm.toLowerCase();
    if (!q) return committees;
    return committees.filter(
      c =>
        c.committee.toLowerCase().includes(q) ||
        c.chairperson?.toLowerCase().includes(q) ||
        c.members?.some(m => m.name.toLowerCase().includes(q))
    );
  }, [committees, searchTerm]);

  return (
    <div className="p-4 md:p-6">
      {/* Rebuilt Page Hero & Search without missing components */}
      <div>
        <div className="flex items-center gap-1.5 mb-4">
          <Link
            to="/government/elected-officials"
            className="text-primary-600 hover:text-primary-800 flex items-center gap-1 text-xs font-bold tracking-widest uppercase transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            All Officials
          </Link>
        </div>
        <div className="center-content max-w-3xl mx-auto text-center mb-8">
          <Heading level={2}>Committees</Heading>
          <p className="text-gray-500 mt-2 text-sm">
            Active committees of the Sangguniang Bayan.
          </p>
        </div>
      </div>

      {/* 
        Search Bar is hidden for now. To re-enable, 
        uncomment the block below and the searchTerm state.
      */}
      {/* 
      <div className="mt-6 flex justify-end">
        <div className="w-full md:w-72 mb-2">
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search committees..."
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          />
        </div>
      </div>
      */}

      {/* Rebuilt Empty State */}
      {filteredCommittees.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-50 py-16 text-center">
          <div className="mb-4 rounded-full bg-gray-200 p-4 text-gray-500">
            <BookOpenIcon className="h-8 w-8" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">
            No Committees Found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            We couldn't find any committees matching "{searchTerm}".
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredCommittees.map((committee, index) => (
            /* --- NEW GRADIENT HOVER WRAPPER --- */
            <div
              key={index}
              className="group flex h-full flex-col rounded-xl bg-gray-200 p-[2px] shadow-sm transition-all duration-300 hover:bg-[linear-gradient(to_right,var(--color-medium-blue,#357CBB),var(--color-primary-magenta,#CE1877))] hover:shadow-xl hover:-translate-y-1.5 cursor-pointer"
            >
              <Card className="flex h-full flex-col bg-white border-transparent rounded-[10px]">
                <CardContent className="flex h-full flex-col space-y-4 p-5">
                  {/* Top Row: Icon & Title */}
                  <div className="flex items-start gap-3">
                    <div className="bg-orange-50 text-orange-600 shrink-0 rounded-lg border border-orange-100 p-2 shadow-sm">
                      <BookOpenIcon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-gray-900 text-base text-[12px] font-bold leading-tight">
                        {toTitleCase(committee.committee)}
                      </h3>
                      <p className="text-gray-500 mt-1 text-[8px] font-bold tracking-widest uppercase">
                        Committee
                      </p>
                    </div>
                  </div>

                  {/* Chairperson Highlight Box */}
                  <div className="bg-gray-50 flex items-center gap-3 rounded-xl border border-gray-100 px-3 py-3">
                    <div className="bg-white text-gray-400 shrink-0 rounded-full border border-gray-200 p-1.5 shadow-sm">
                      <User2 className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-gray-500 mb-0.5 text-[8px] font-bold tracking-tighter uppercase">
                        Chairperson
                      </p>
                      <p className="text-gray-900 truncate text-[10px] font-bold leading-tight">
                        {toTitleCase(committee.chairperson)}
                      </p>
                    </div>
                  </div>

                  {/* Member List */}
                  {committee.members && committee.members.length > 0 && (
                    <div className="border-t border-gray-100 pt-4 mt-auto">
                      <div className="mb-3 flex items-center gap-1.5">
                        <UsersIcon className="text-orange-500 h-3 w-3" />
                        <p className="text-gray-500 text-[8px] font-bold tracking-widest uppercase">
                          Members ({committee.members.length})
                        </p>
                      </div>
                      <div className="space-y-2.5">
                        {committee.members.map((member, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between gap-2"
                          >
                            <p className="text-gray-700 truncate text-[10px] font-medium">
                              {toTitleCase(member.name)}
                            </p>
                            {member.role && (
                              <span className="text-gray-500 text-[8px] bg-gray-100 shrink-0 rounded px-1.5 py-0.5 text-[9px] font-bold uppercase">
                                {member.role}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            /* --- END WRAPPER --- */
          ))}
        </div>
      )}

      {/* Summary footer */}
      {filteredCommittees.length > 0 && (
        <p className="text-gray-400 mt-8 text-center text-xs">
          Showing {filteredCommittees.length} of {committees.length} committees
        </p>
      )}
    </div>
  );
}
