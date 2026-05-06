import Section from '../components/ui/Section';
import { useParams, Link } from 'react-router-dom';
import { Heading } from '../components/ui/Heading';
import { Text } from '../components/ui/Text';
import {
  tourismCategories,
  getTourismPlaces,
  getFeaturedPlaces,
  type Place,
} from '../data/tourismLoader';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import SEO from '../components/SEO';
import { Card, CardContent } from '@bettergov/kapwa/card';
import { Banner } from '@bettergov/kapwa/banner';
import { useState, useEffect } from 'react';
import { resolveLucideIcon } from '../lib/utils';
import TourismCard from '@/components/ui/TourismCard';
import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FiFacebook } from 'react-icons/fi';

const heroImages = getFeaturedPlaces().map(p => p.image);

const Tourism: React.FC = () => {
  const { category } = useParams();
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(false);
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    if (heroImages.length < 2) return;
    const id = setInterval(
      () => setHeroIndex(i => (i + 1) % heroImages.length),
      5000
    );
    return () => clearInterval(id);
  }, []);

  const getCategory = () => {
    return tourismCategories.categories.find(c => c.slug === category);
  };

  const categoryData = getCategory();
  const Icon = resolveLucideIcon(categoryData?.icon);

  useEffect(() => {
    if (category && categoryData) {
      setLoading(true);
      getTourismPlaces(category)
        .then(setPlaces)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [category, categoryData]);

  if (!category) {
    return (
      <>
        <SEO
          title="Tourism"
          description={`Discover the best tourist spots, accommodations, and attractions in ${import.meta.env.VITE_GOVERNMENT_NAME}. Beaches, resorts, cafes, hotels, and more.`}
          keywords="tourism, travel, beaches, resorts, hotels, dining, attractions, tourist spots"
        />
        <section className="relative overflow-hidden bg-primary-700 text-white py-16">
          {heroImages.map((src, i) => (
            <div
              key={src}
              className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
              style={{
                backgroundImage: `url(${src})`,
                opacity: i === heroIndex ? 1 : 0,
              }}
            />
          ))}
          <div className="absolute inset-0 bg-primary-900/65" />
          <div className="relative z-10 max-w-full mx-auto sm:px-6 px-4">
            <Heading
              level={5}
              className="text-primary-200 inline-flex items-center gap-2 uppercase tracking-wide font-medium -mb-6"
            >
              <MapPin />
              Allen, Northern Samar
            </Heading>
            <Heading className="tracking-wide">Tourism</Heading>
            <Heading level={3} className="text-primary-100 -mt-4">
              "The Gateway of Eastern Visayas"
            </Heading>
            <p className="text-primary-100 md:text-xl text-base max-w-xl mb-6">
              Discover the Gateway to the Samar Island, where stunning coastal
              rock formations and beaches meet the warm hospitality of a vibrant
              port town.
            </p>

            <div className="mb-6 flex gap-4">
              <div className="px-4 py-1 font-bold bg-primary-600 border-primary-100/20 w-fit border rounded-4xl text-sm">
                Allen yun
              </div>
              <div className="px-4 py-1 font-bold bg-primary-600 border-primary-100/20 w-fit border rounded-4xl text-sm">
                Tara sa Norte!
              </div>
            </div>

            <Link to="https://www.facebook.com/allensamartourism/">
              <Button
                variant={'link'}
                className="bg-white text-primary-700 text-base sm:text-lg px-6 py-6 font-semibold cursor-pointer"
              >
                <FiFacebook />
                Follow @allensamartourism
              </Button>{' '}
            </Link>
          </div>
        </section>

        <Section className="p-3 my-12">
          <Heading level={2}>Browse by Category</Heading>
          <Text className="text-gray-600 mb-6">
            Discover the best places to visit, stay, and dine in{' '}
            {import.meta.env.VITE_GOVERNMENT_NAME}.
          </Text>

          {tourismCategories.categories.length === 0 ? (
            <Text className="text-gray-500 text-center py-8">
              No tourism categories available at the moment.
            </Text>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {tourismCategories.categories.map(cat => {
                const CatIcon = resolveLucideIcon(cat.icon);
                return (
                  <Link key={cat.slug} to={`/tourism/${cat.slug}`}>
                    <Card
                      hoverable
                      className={`h-full border-t-4 ${cat.color.border}`}
                    >
                      <CardContent>
                        <div
                          className={`${cat.color.bg} ${cat.color.text} p-3 rounded-md mb-4 w-fit`}
                        >
                          <CatIcon className="h-6 w-6" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {cat.category}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {cat.description}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          )}
        </Section>
      </>
    );
  }

  if (!categoryData) {
    return (
      <Section className="p-3 mb-12">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Tourism', href: '/tourism' },
            { label: category },
          ]}
          className="mb-8"
        />
        <Banner
          type="error"
          title="Category not found"
          description="The tourism category you are looking for does not exist."
          icon
        />
      </Section>
    );
  }

  return (
    <>
      <SEO
        title={`${categoryData.category} | Tourism`}
        description={categoryData.description}
        keywords={`${categoryData.category}, tourism, travel, attractions, ${import.meta.env.VITE_GOVERNMENT_NAME}`}
      />
      <Section className="p-3 mb-12" maxWidth="full">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Tourism', href: '/tourism' },
            { label: categoryData.category },
          ]}
          className="mb-8"
        />
        <Icon className="h-8 w-8 mb-4 text-primary-600 rounded-md" />
        <Heading>{categoryData.category}</Heading>
        <Text className="text-gray-600 mb-6">{categoryData.description}</Text>

        {loading ? (
          <div className="flex justify-center items-center p-8">
            <Text>Loading places...</Text>
          </div>
        ) : places.length === 0 ? (
          <Text className="text-gray-500 text-center py-8">
            No places listed for this category yet.
          </Text>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {places.map(place => (
              <TourismCard
                key={place.slug}
                name={place.name}
                description={place.description}
                slug={place.slug}
                barangay={place.barangay}
                category={place.category}
                categoryColor={place.categoryColor}
                image={place.image}
                mapsUrl={place.mapsUrl}
                contact={place.contact}
                socialUrl={place.socialUrl}
              />
            ))}
          </div>
        )}
      </Section>
    </>
  );
};

export default Tourism;
