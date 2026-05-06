import { useMemo, useState } from 'react';
import { BookOpenIcon, User2, UsersIcon } from 'lucide-react';
import yaml from 'js-yaml';
import { Card, CardContent } from '@bettergov/kapwa/card';
import { Heading } from '../../../components/ui/Heading';
import legislativeYaml from '../../../../content/government/elected-officials/legislative/index.yaml?raw';

function toTitleCase(str: string) {
  return str.replace(
    /\w\S*/g,
    txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
}

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
            committeesMap.set(c, { committee: c, chairperson: official.name, members: [] });
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
            committeesMap.set(c, { committee: c, chairperson: 'TBA', members: [] });
          }
          committeesMap.get(c)!.members!.push({ name: official.name, role: 'Vice Chairperson' });
        });
      }
      if (official.committee_member) {
        official.committee_member.forEach(c => {
          if (!committeesMap.has(c)) {
            committeesMap.set(c, { committee: c, chairperson: 'TBA', members: [] });
          }
          committeesMap.get(c)!.members!.push({ name: official.name, role: 'Member' });
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
      {/* Header */}
      <div>
        {/* Back link — larger touch target on mobile */}
        <div className="text-center mb-6 md:mb-8">
          <Heading level={2}>Committees</Heading>
          <p className="text-gray-500 mt-2 text-sm">
            Active committees of the Sangguniang Bayan.
          </p>
        </div>
      </div>

      {/* Empty state */}
      {filteredCommittees.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-50 py-16 text-center px-4">
          <div className="mb-4 rounded-full bg-gray-200 p-4 text-gray-500">
            <BookOpenIcon className="h-8 w-8" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">No Committees Found</h3>
          <p className="mt-1 text-sm text-gray-500">
            We couldn't find any committees matching "{searchTerm}".
          </p>
        </div>
      ) : (
        /*
          Mobile  → 1 column (committee cards have dense content; 1-col is
                    more readable on narrow screens than a cramped 2-col)
          sm      → 2 columns
          xl      → 3 columns
        */
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 items-stretch gap-3 md:gap-4">
          {filteredCommittees.map((committee, index) => (
            <div
              key={index}
              className="group flex h-full flex-col rounded-xl bg-gray-200 p-[2px] shadow-sm transition-all duration-300 hover:bg-[linear-gradient(to_right,var(--color-medium-blue,#357CBB),var(--color-primary-magenta,#CE1877))] hover:shadow-xl hover:-translate-y-1 cursor-pointer"
            >
              <Card className="flex h-full flex-col bg-white border-transparent rounded-[10px]">
                <CardContent className="flex h-full flex-col space-y-3 p-4 md:p-5">
                  {/* Icon + title */}
                  <div className="flex items-start gap-3">
                    <div className="bg-orange-50 text-orange-600 shrink-0 rounded-lg border border-orange-100 p-2 shadow-sm">
                      <BookOpenIcon className="h-4 w-4 md:h-5 md:w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-gray-900 text-[12px] font-bold leading-tight">
                        {toTitleCase(committee.committee)}
                      </h3>
                      <p className="text-gray-500 mt-1 text-[8px] font-bold tracking-widest uppercase">
                        Committee
                      </p>
                    </div>
                  </div>

                  {/* Chairperson */}
                  <div className="bg-gray-50 flex items-center gap-2 md:gap-3 rounded-xl border border-gray-100 px-3 py-2.5">
                    <div className="bg-white text-gray-400 shrink-0 rounded-full border border-gray-200 p-1.5 shadow-sm">
                      <User2 className="h-3.5 w-3.5 md:h-4 md:w-4" />
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

                  {/* Members */}
                  {committee.members && committee.members.length > 0 && (
                    <div className="border-t border-gray-100 pt-3 mt-auto">
                      <div className="mb-2 flex items-center gap-1.5">
                        <UsersIcon className="text-orange-500 h-3 w-3" />
                        <p className="text-gray-500 text-[8px] font-bold tracking-widest uppercase">
                          Members ({committee.members.length})
                        </p>
                      </div>
                      <div className="space-y-2">
                        {committee.members.map((member, i) => (
                          <div key={i} className="flex items-center justify-between gap-2">
                            <p className="text-gray-700 truncate text-[10px] font-medium">
                              {toTitleCase(member.name)}
                            </p>
                            {member.role && (
                              <span className="text-gray-500 bg-gray-100 shrink-0 rounded px-1.5 py-0.5 text-[9px] font-bold uppercase">
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
          ))}
        </div>
      )}

      {/* Footer count */}
      {filteredCommittees.length > 0 && (
        <p className="text-gray-400 mt-6 md:mt-8 text-center text-xs">
          Showing {filteredCommittees.length} of {committees.length} committees
        </p>
      )}
    </div>
  );
}