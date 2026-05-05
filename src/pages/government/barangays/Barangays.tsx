import { useEffect, useState } from 'react';
import Section from '../../components/ui/Section';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import { Heading } from '../../components/ui/Heading';
import { Text } from '../../components/ui/Text';
import Banner from '../../components/ui/Banner';
import SEO from '../../components/SEO';
import { Card, CardContent } from '@bettergov/kapwa/card';
import { MapPin } from 'lucide-react';

interface BarangayOfficial {
  role: string;
  name: string;
  contact?: string;
  email?: string;
}

interface Barangay {
  slug: string;
  barangay_name: string;
  address?: string | null;
  trunkline?: string[];
  website?: string | null;
  officials: BarangayOfficial[];
}

export default function Barangays() {
  const [barangays, setBarangays] = useState<Barangay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        await fetch('/content/government/barangays/index.yaml');
        // You may want to use a YAML parser here, or fetch from an API endpoint that returns JSON
        // For now, just set as empty array for placeholder
        setBarangays([]); // TODO: parse YAML and set barangays
      } catch {
        setError('Failed to load barangays data');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <SEO
        title="Barangays"
        description="List of barangays in the municipality."
      />
      <Section className="p-3 mb-12" maxWidth="7xl">
        <Breadcrumbs
          className="mb-8"
          items={[
            { label: 'Home', href: '/' },
            { label: 'Government', href: '/government' },
            { label: 'Barangays' },
          ]}
        />
        <Heading level={2} className="mb-4">
          Barangays
        </Heading>
        <Text className="mb-6">
          Local government units within the municipality, led by elected
          officials who manage community-level services and programs.
        </Text>
        {loading ? (
          <Banner type="info" description="Loading barangays..." />
        ) : error ? (
          <Banner type="error" description={error} />
        ) : barangays.length === 0 ? (
          <Banner type="info" description="No barangay data available." />
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {barangays.map((brgy, i) => {
              const punong = brgy.officials?.find(o =>
                o.role.includes('Punong Barangay')
              );
              return (
                <Card key={brgy.slug + i} hoverable className="h-full">
                  <CardContent className="flex flex-col gap-2 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-primary-100 text-primary-700 rounded-full p-2">
                        <MapPin className="h-5 w-5" />
                      </span>
                      <span className="font-semibold text-lg">
                        {brgy.barangay_name}
                      </span>
                    </div>
                    {punong && (
                      <div className="text-sm text-gray-700">
                        Punong Barangay: {punong.name}
                      </div>
                    )}
                    {brgy.trunkline && brgy.trunkline.length > 0 && (
                      <div className="text-xs text-gray-500">
                        Trunkline: {brgy.trunkline.join(', ')}
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </Section>
    </>
  );
}
