import { Card, CardContent } from '@bettergov/kapwa/card';

export interface MunicipalOffice {
  name: string;
  head: string;
  address?: string;
  office_hours?: string;
  contact?: {
    email?: string;
    phone?: string;
  };
}

export default function MunicipalOfficeCard({
  name,
  head,
  address,
  office_hours,
  contact,
}: MunicipalOffice) {
  return (
    <Card className="h-full flex flex-col">
      <CardContent className="flex-1 flex flex-col p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{name}</h3>
        <p className="text-sm text-primary-700 font-medium mb-1">
          Head: {head}
        </p>
        {address && <p className="text-xs text-gray-500 mb-1">{address}</p>}
        {office_hours && (
          <p className="text-xs text-gray-500 mb-1">
            Office Hours: {office_hours}
          </p>
        )}
        {contact && (contact.email || contact.phone) && (
          <div className="mt-auto pt-2 text-xs text-gray-600">
            {contact.email && (
              <div>
                Email:{' '}
                <a href={`mailto:${contact.email}`} className="underline">
                  {contact.email}
                </a>
              </div>
            )}
            {contact.phone && (
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
