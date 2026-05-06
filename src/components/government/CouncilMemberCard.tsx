import { BookOpenIcon, Phone, Mail } from 'lucide-react';
import { Card, CardContent } from '@bettergov/kapwa/card';
import { toTitleCase } from '@/lib/stringUtils';
import type { LegislativeOfficial } from '@/data/yamlLoader';

export default function CouncilMemberCard({
  member,
}: {
  member: LegislativeOfficial;
}) {
  const chairedCommittees = member.committee_chair || [];

  return (
    <Card className="group flex h-full flex-col bg-white border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer">
      <CardContent className="flex h-full flex-col space-y-3 p-4 md:p-5">
        {/* Row 1: Position + Name */}
        <div>
          <p className="text-primary-700 mb-0.5 text-[11px] font-bold tracking-widest uppercase">
            {member.position || 'SB Member'}
          </p>
          <p className="text-gray-900 text-base font-bold leading-tight">
            Hon. {toTitleCase(member.name)}
          </p>
        </div>

        {/* Row 2: Committee Chair List */}
        {chairedCommittees.length > 0 ? (
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <BookOpenIcon className="text-primary-600 h-3.5 w-3.5 shrink-0" />
              <span className="text-gray-600 text-[10px] font-bold tracking-widest uppercase">
                Committee Chair
              </span>
            </div>
            <ul className="flex flex-col gap-1 pl-5 list-disc marker:text-gray-300">
              {chairedCommittees.map(committee => (
                <li
                  key={committee}
                  className="text-gray-800 wrap-break-word text-[12px] font-medium leading-snug"
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
                className="flex items-center gap-2 text-sm font-semibold text-gray-900 hover:text-primary-600 transition-colors group"
              >
                <Phone className="h-3 w-3 text-gray-400 group-hover:text-primary-500 shrink-0 transition-colors" />
                {member.contact.phone}
              </a>
            )}
            {member.contact?.email && (
              <a
                href={`mailto:${member.contact.email}`}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary-600 transition-colors group"
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
