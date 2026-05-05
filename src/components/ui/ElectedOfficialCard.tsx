import { Card, CardContent } from '@bettergov/kapwa/card';

export interface ElectedOfficial {
  name: string;
  position: string;
  photo?: string;
  short_profile?: string;
  term?: string;
  committee?: string;
  contact?: {
    email?: string;
    phone?: string;
  };
}

export default function ElectedOfficialCard({
  name,
  position,
  photo,
  short_profile,
  term,
  committee,
  contact,
}: ElectedOfficial) {
  return (
    <Card className="h-full flex flex-col">
      {photo && (
        <img
          src={photo}
          alt={name}
          className="w-full h-40 object-cover rounded-t-md"
        />
      )}
      <CardContent className="flex-1 flex flex-col p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{name}</h3>
        <p className="text-sm text-primary-700 font-medium mb-1">{position}</p>
        {term && <p className="text-xs text-gray-500 mb-1">Term: {term}</p>}
        {committee && <p className="text-xs text-gray-500 mb-1">{committee}</p>}
        {short_profile && (
          <p className="text-sm text-gray-700 mb-2">{short_profile}</p>
        )}
        {contact && (contact.email || contact.phone) && (
          <div className="mt-auto pt-2 text-xs text-gray-600">
            {contact.email && contact.email !== '' && (
              <div>
                Email:{' '}
                <a href={`mailto:${contact.email}`} className="underline">
                  {contact.email}
                </a>
              </div>
            )}
            {contact.phone && contact.phone !== '' && (
              <div>
                Phone:{' '}
                <a href={`tel:${contact.phone}`} className="underline">
                  {contact.phone}
                </a>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
