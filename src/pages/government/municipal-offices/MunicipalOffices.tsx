import { useEffect, useState } from 'react';
import Section from '../../components/ui/Section';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import { Heading } from '../../components/ui/Heading';
import { Text } from '../../components/ui/Text';
import Banner from '../../components/ui/Banner';
import MunicipalOfficeCard, {
  MunicipalOffice,
} from '../../components/ui/MunicipalOfficeCard';
import SEO from '../../components/SEO';

export default function MunicipalOffices() {
  const [offices, setOffices] = useState<MunicipalOffice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        await fetch('/content/government/municipal-offices/index.yaml');
        // You may want to use a YAML parser here, or fetch from an API endpoint that returns JSON
        // For now, just set as empty array for placeholder
        setOffices([]); // TODO: parse YAML and set offices
      } catch {
        setError('Failed to load offices data');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <SEO
        title="Municipal Offices"
        description="Directory of municipal offices."
      />
      <Section className="p-3 mb-12" maxWidth="7xl">
        <Breadcrumbs
          className="mb-8"
          items={[
            { label: 'Home', href: '/' },
            { label: 'Government', href: '/government' },
            { label: 'Municipal Offices' },
          ]}
        />
        <Heading level={2} className="mb-4">
          Municipal Offices
        </Heading>
        <Text className="mb-6">
          Directory of local government offices and departments.
        </Text>
        {loading ? (
          <Banner type="info" description="Loading offices..." />
        ) : error ? (
          <Banner type="error" description={error} />
        ) : offices.length === 0 ? (
          <Banner
            type="info"
            description="No municipal office data available."
          />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {offices.map((office, i) => (
              <MunicipalOfficeCard key={office.name + i} {...office} />
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
