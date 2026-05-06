import { BookOpenIcon, User2, UsersIcon } from 'lucide-react';
import { Card, CardContent } from '@bettergov/kapwa/card';
import { toTitleCase } from '@/lib/stringUtils';

export interface CommitteeMember {
  name: string;
  role?: string;
}

export interface Committee {
  committee: string;
  chairperson: string;
  members?: CommitteeMember[];
}

export default function CommitteeCard({ committee }: { committee: Committee }) {
  return (
    <div className="group flex h-full flex-col rounded-xl bg-gray-200 p-[2px] shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer">
      <Card className="flex h-full flex-col bg-white border-transparent rounded-[10px]">
        <CardContent className="flex h-full flex-col space-y-3 p-4 md:p-5">
          {/* Icon + title */}
          <div className="flex items-start gap-3">
            <div className="bg-primary-50 text-primary-700 shrink-0 rounded-lg border border-primary-100 p-2 shadow-sm">
              <BookOpenIcon className="h-4 w-4 md:h-5 md:w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-gray-900 text-sm font-bold leading-tight wrap-break-word">
                {toTitleCase(committee.committee)}
              </h3>
              <p className="text-gray-600 mt-1 text-[10px] font-bold tracking-widest uppercase">
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
              <p className="text-gray-600 mb-0.5 text-[10px] font-bold tracking-tighter uppercase">
                Chairperson
              </p>
              <p className="text-gray-900 truncate text-sm font-bold leading-tight">
                {toTitleCase(committee.chairperson)}
              </p>
            </div>
          </div>

          {/* Members */}
          {committee.members && committee.members.length > 0 && (
            <div className="border-t border-gray-100 pt-3 mt-auto">
              <div className="mb-2 flex items-center gap-1.5">
                <UsersIcon className="text-primary-600 h-3 w-3" />
                <p className="text-gray-600 text-[10px] font-bold tracking-widest uppercase">
                  Members ({committee.members.length})
                </p>
              </div>
              <div className="space-y-2">
                {committee.members.map((member, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between gap-2"
                  >
                    <p className="text-gray-800 truncate text-[12px] font-medium">
                      {toTitleCase(member.name)}
                    </p>
                    {member.role && (
                      <span className="text-gray-600 bg-primary-50 shrink-0 rounded px-1.5 py-0.5 text-[10px] font-bold uppercase">
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
  );
}
