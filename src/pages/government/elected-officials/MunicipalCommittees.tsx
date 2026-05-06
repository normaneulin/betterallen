import { useState } from 'react';
import { Heading } from '../../../components/ui/Heading';
import {
  legislativeOfficials,
  type LegislativeOfficial,
} from '../../../data/yamlLoader';
import CommitteeCard, {
  type Committee,
} from '../../../components/government/CommitteeCard';
import CommitteesEmptyState from '../../../components/government/CommitteesEmptyState';

export default function MunicipalCommitteesPage() {
  const [searchTerm] = useState('');
  const legislativeList = legislativeOfficials as LegislativeOfficial[];
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

  const committees = Array.from(committeesMap.values()).sort((a, b) =>
    a.committee.localeCompare(b.committee)
  );

  const q = searchTerm.toLowerCase();
  const filteredCommittees = q
    ? committees.filter(
        c =>
          c.committee.toLowerCase().includes(q) ||
          c.chairperson?.toLowerCase().includes(q) ||
          c.members?.some(m => m.name.toLowerCase().includes(q))
      )
    : committees;

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
        <CommitteesEmptyState searchTerm={searchTerm} />
      ) : (
        /*
          Mobile  → 1 column (committee cards have dense content; 1-col is
                    more readable on narrow screens than a cramped 2-col)
          sm      → 2 columns
          xl      → 3 columns
        */
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 items-stretch gap-3 md:gap-4">
          {filteredCommittees.map((committee, index) => (
            <CommitteeCard key={index} committee={committee} />
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
