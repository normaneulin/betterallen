import yaml from 'js-yaml';

export interface Place {
  name: string;
  slug: string;
  description: string;
  barangay: string;
  image: string;
  mapsUrl?: string;
  contact?: string;
  socialUrl?: string;
  featured?: boolean;
  category: string;
  categoryColor: string;
}

export interface Category {
  category: string;
  slug: string;
  description: string;
  icon: string;
  color: {
    bg: string;
    text: string;
    border: string;
  };
}

export interface TourismData {
  categories: Category[];
}

// Import the YAML file as raw text
import tourismYamlContent from './tourism.yaml?raw';

// Import all category index files statically
import beachesResortsIndex from '../../content/tourism/beaches-resorts/index.yaml?raw';
import cafesDiningIndex from '../../content/tourism/cafes-dining/index.yaml?raw';
import hotelsLodgingIndex from '../../content/tourism/hotels-lodging/index.yaml?raw';
import natureOutdoorIndex from '../../content/tourism/nature-outdoor/index.yaml?raw';
import culturalHeritageIndex from '../../content/tourism/cultural-heritage/index.yaml?raw';
import activitiesRecreationIndex from '../../content/tourism/activities-recreation/index.yaml?raw';

// Create a mapping of category slugs to their YAML content
const categoryIndexMap: { [key: string]: string } = {
  'beaches-resorts': beachesResortsIndex,
  'cafes-dining': cafesDiningIndex,
  'hotels-lodging': hotelsLodgingIndex,
  'nature-outdoor': natureOutdoorIndex,
  'cultural-heritage': culturalHeritageIndex,
  'activities-recreation': activitiesRecreationIndex,
};

// Parse the YAML content
export const tourismCategories: TourismData = yaml.load(
  tourismYamlContent
) as TourismData;

// Function to get places for a category
export async function getTourismPlaces(categorySlug: string): Promise<Place[]> {
  const yamlContent = categoryIndexMap[categorySlug];
  if (!yamlContent) {
    return [];
  }
  try {
    const data = yaml.load(yamlContent) as { places: Place[] };
    return data.places || [];
  } catch (parseError) {
    console.warn(
      `Failed to parse YAML content for tourism category ${categorySlug}:`,
      parseError
    );
    return [];
  }
}

// Function to check if a slug is a valid tourism category
export function isTourismCategory(slug: string): boolean {
  return slug in categoryIndexMap;
}

// Returns all places marked featured: true across all categories
// Usage: tourism page slideshow
export function getFeaturedPlaces(): Place[] {
  return Object.values(categoryIndexMap).flatMap(yamlContent => {
    try {
      const data = yaml.load(yamlContent) as { places: Place[] };
      return (data.places || []).filter(p => p.featured);
    } catch {
      return [];
    }
  });
}
