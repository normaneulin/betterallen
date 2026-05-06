import Section from '../ui/Section';
import * as LucideIcons from 'lucide-react';
import { Landmark, Gavel, ShieldCheck } from 'lucide-react';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import { useTranslation } from '../../hooks/useTranslation';
import { Card, CardContent } from '@bettergov/kapwa/card';
import { Link } from 'react-router-dom';
import { toTitleCase } from '../../lib/stringUtils';

import {
  executiveOfficials,
  governmentCategories,
} from '../../data/yamlLoader';

interface Subcategory {
  name: string;
  slug: string;
}

interface Category {
  category: string;
  slug: string;
  subcategories: Subcategory[];
  description: string;
  icon: string;
}

interface GovernmentActivitySectionProps {
  title?: string;
  description?: string;
}

export default function GovernmentActivitySection({
  title,
  description,
}: GovernmentActivitySectionProps = {}) {
  const { t } = useTranslation();
  const mayor = executiveOfficials.find(
    official =>
      official.slug?.includes('mayor') && !official.slug?.includes('vice')
  );
  const viceMayor = executiveOfficials.find(official =>
    official.slug?.includes('vice')
  );

  const getIcon = (category: string) => {
    const IconComponent = LucideIcons[
      category as keyof typeof LucideIcons
    ] as React.ComponentType<{ className?: string }>;
    return IconComponent ? <IconComponent className="h-6 w-6" /> : null;
  };

  const displayedCategories = governmentCategories.categories as Category[];

  return (
    <Section id="#government">
      <Heading level={2}>{title || t('governmentActivity.title')}</Heading>
      <Text className="text-gray-600 mb-6">
        {description || t('governmentActivity.description')}
      </Text>

      {(mayor || viceMayor) && (
        <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {mayor && (
            <Card className="group h-full bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <Link
                to="/government/elected-officials"
                className="inline-flex h-full w-full justify-center"
              >
                <CardContent className="flex h-full flex-col items-center space-y-4 py-6 px-4 text-center">
                  <div className="relative">
                    <div className="flex h-20 w-20 md:h-24 md:w-24 items-center justify-center rounded-full border-4 shadow-sm bg-white border-primary-500 text-primary-600">
                      <Landmark className="h-8 w-8 md:h-10 md:w-10" />
                    </div>
                    <div className="bg-primary-500 text-white absolute -right-1 -bottom-1 rounded-full border-2 border-white p-1.5 shadow-md">
                      <ShieldCheck className="h-4 w-4" />
                    </div>
                  </div>

                  <div className="min-w-0 flex-1 w-full">
                    <p className="text-primary-600 text-[10px] font-bold tracking-widest uppercase mb-1.5">
                      {mayor.office || 'Municipal Mayor'}
                    </p>
                    <h3 className="text-gray-900 text-lg md:text-xl leading-tight font-black mb-3">
                      Hon. {toTitleCase(mayor.name)}
                    </h3>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary-50 text-primary-700">
                      Mayor
                    </span>
                  </div>
                </CardContent>
              </Link>
            </Card>
          )}
          {viceMayor && (
            <Card className="group h-full bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <Link
                to="/government/elected-officials"
                className="inline-flex h-full w-full justify-center"
              >
                <CardContent className="flex h-full flex-col items-center space-y-4 py-6 px-4 text-center">
                  <div className="relative">
                    <div className="flex h-20 w-20 md:h-24 md:w-24 items-center justify-center rounded-full border-4 shadow-sm bg-white text-gray-400 border-orange-400">
                      <Gavel className="h-8 w-8 md:h-10 md:w-10" />
                    </div>
                  </div>

                  <div className="min-w-0 flex-1 w-full">
                    <p className="text-primary-600 text-[10px] font-bold tracking-widest uppercase mb-1.5">
                      {viceMayor.office || 'Municipal Vice Mayor'}
                    </p>
                    <h3 className="text-gray-900 text-lg md:text-xl leading-tight font-black mb-3">
                      Hon. {toTitleCase(viceMayor.name)}
                    </h3>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gray-100 text-gray-700">
                      Vice Mayor
                    </span>
                  </div>
                </CardContent>
              </Link>
            </Card>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {displayedCategories.map(category => (
          <Card
            key={category.slug}
            hoverable
            className="border-t-4 border-primary-500"
          >
            <Link
              to={`/government/${category.slug}`}
              className="mt-auto text-primary-600 hover:text-primary-700 font-medium transition-colors inline-flex items-center"
            >
              <CardContent className="flex flex-col h-full p-6">
                <div className="flex gap-2">
                  <div className="bg-primary-100 text-primary-600 p-3 rounded-md mb-4 self-start">
                    {getIcon(category.icon)}
                  </div>

                  <h3 className="text-lg font-semibold mb-4 text-gray-900 self-center">
                    {category.category}
                  </h3>
                </div>
                <Text className="text-gray-800">{category.description}</Text>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </Section>
  );
}
