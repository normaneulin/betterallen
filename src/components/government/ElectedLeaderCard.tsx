import { Landmark, Gavel, ShieldCheck, Phone, Mail } from 'lucide-react';
import { Card, CardContent } from '@bettergov/kapwa/card';
import { toTitleCase } from '@/lib/stringUtils';
import type { ExecutiveOfficial } from '@/data/yamlLoader';

export default function ElectedLeaderCard({
  leader,
}: {
  leader: ExecutiveOfficial;
}) {
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
