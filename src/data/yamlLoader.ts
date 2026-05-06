import yaml from 'js-yaml';

// Type definitions for the services data
export interface Subcategory {
  name: string;
  slug: string;
  description?: string;
}

export interface Category {
  category: string;
  slug: string;
  description: string;
  icon: string;
  type: string; // e.g., 'service', 'tourism', etc.
  subcategories?: Subcategory[]; // Keep for backward compatibility
}

export interface CategoryData {
  categories: Category[];
  description: string;
}

export interface CategoryIndexData {
  title?: string;
  description?: string;
  layout?: 'grid' | 'list';
  pages: Subcategory[];
}

export interface ExecutiveOfficial {
  slug: string;
  name: string;
  role: string;
  office?: string;
  address?: string;
  contact?: {
    email?: string;
    phone?: string;
  };
  website?: string;
  isElected?: boolean;
  personId?: string;
}

export interface LegislativeOfficial {
  name: string;
  position: string;
  contact?: {
    email?: string;
    phone?: string;
  };
  website?: string;
  personId?: string;
  committee_chair?: string[];
  committee_vice_chair?: string[];
  committee_member?: string[];
}

export interface BarangayOfficial {
  role: string;
  name: string | null;
  contact: string | null;
  email: string | null;
}

export interface Barangay {
  slug: string;
  barangay_name: string;
  address: string | null;
  trunkline: string[] | null;
  website: string | null;
  officials: BarangayOfficial[] | null;
}

export interface MunicipalOffice {
  slug: string;
  office_name: string;
  website?: string;
  department_head?: {
    name: string;
    contact?: string;
  };
}

export interface AllenStat {
  label: string;
  value: string;
  sublabel?: string;
  asOf?: string;
  icon?: string;
}

export interface AllenTimelineEntry {
  year: string;
  event: string;
}

export interface AboutAllenData {
  name: string;
  province: string;
  description: string;
  history: string;
  geography?: string;
  economy?: string;
  stats: AllenStat[];
  timeline: AllenTimelineEntry[];
  card_description?: string;
}

export interface BetterGovBenefit {
  audience: string;
  icon?: string;
  description: string;
}

export interface AboutBetterGovData {
  name: string;
  tagline?: string;
  description: string;
  mission: string;
  why: string;
  benefits: BetterGovBenefit[];
  card_description?: string;
}

// Import the YAML file as raw text
import servicesYamlContent from './services.yaml?raw';
import governmentActivitiesYamlContent from './government.yaml?raw';
import aboutAllenYamlContent from './about_allen.yaml?raw';
import aboutBetterGovYamlContent from './about_bettergov.yaml?raw';

// Import all category index files statically
import healthServicesIndex from '../../content/services/health-services/index.yaml?raw';
import educationIndex from '../../content/services/education/index.yaml?raw';
import businessIndex from '../../content/services/business/index.yaml?raw';
import socialWelfareIndex from '../../content/services/social-welfare/index.yaml?raw';
import agricultureFisheriesIndex from '../../content/services/agriculture-fisheries/index.yaml?raw';
import infrastructurePublicWorksIndex from '../../content/services/infrastructure-public-works/index.yaml?raw';
import garbageWasteDisposalIndex from '../../content/services/garbage-waste-disposal/index.yaml?raw';
import environmentIndex from '../../content/services/environment/index.yaml?raw';
import disasterPreparednessIndex from '../../content/services/disaster-preparedness/index.yaml?raw';
import housingLandUseIndex from '../../content/services/housing-land-use/index.yaml?raw';
import civilRegistryIndex from '../../content/services/civil-registry/index.yaml?raw';
import taxRevenueIndex from '../../content/services/tax-revenue/index.yaml?raw';
import employmentIndex from '../../content/services/employment/index.yaml?raw';
import tourismIndex from '../../content/services/tourism/index.yaml?raw';
import electedOfficialsIndex from '../../content/government/elected-officials/index.yaml?raw';
import municipalOfficesIndex from '../../content/government/municipal-offices/index.yaml?raw';
import barangaysIndedex from '../../content/government/barangays/index.yaml?raw';
import governmentIndex from '../../content/government/index.yaml?raw';
import executiveIndex from '../../content/government/elected-officials/executive/index.yaml?raw';
import legislativeIndex from '../../content/government/elected-officials/legislative/index.yaml?raw';

// Create a mapping of category slugs to their YAML content
const categoryIndexMap: { [key: string]: string } = {
  'health-services': healthServicesIndex,
  education: educationIndex,
  business: businessIndex,
  'social-welfare': socialWelfareIndex,
  'agriculture-fisheries': agricultureFisheriesIndex,
  'infrastructure-public-works': infrastructurePublicWorksIndex,
  'garbage-waste-disposal': garbageWasteDisposalIndex,
  environment: environmentIndex,
  'disaster-preparedness': disasterPreparednessIndex,
  'housing-land-use': housingLandUseIndex,
  'civil-registry': civilRegistryIndex,
  'tax-revenue': taxRevenueIndex,
  employment: employmentIndex,
  tourism: tourismIndex,
  // 'departments': departmentsIndex, // Removed to fix undefined error
  government: governmentIndex,
  'elected-officials': electedOfficialsIndex,
  executive: executiveIndex,
  legislative: legislativeIndex,
  'municipal-offices': municipalOfficesIndex,
  barangays: barangaysIndedex,
};

function parseYamlArray<T>(yamlContent: string): T[] {
  try {
    const parsed = yaml.load(yamlContent);
    if (Array.isArray(parsed)) return parsed as T[];
    if (parsed && typeof parsed === 'object' && 'officials' in parsed)
      return (parsed as { officials: T[] }).officials;
    return [];
  } catch {
    return [];
  }
}

function parseYamlObject<T>(yamlContent: string, fallback: T): T {
  try {
    const parsed = yaml.load(yamlContent);
    if (parsed && typeof parsed === 'object') return parsed as T;
    return fallback;
  } catch {
    return fallback;
  }
}

// Parse the YAML content
export const serviceCategories: CategoryData = yaml.load(
  servicesYamlContent
) as CategoryData;

export const governmentCategories: CategoryData = yaml.load(
  governmentActivitiesYamlContent
) as CategoryData;

export const executiveOfficials: ExecutiveOfficial[] =
  parseYamlArray(executiveIndex);

export const legislativeOfficials: LegislativeOfficial[] =
  parseYamlArray(legislativeIndex);

export const municipalOffices: MunicipalOffice[] = parseYamlArray(
  municipalOfficesIndex
);

export const barangays: Barangay[] = parseYamlArray(barangaysIndedex);

export const aboutAllenData: AboutAllenData = parseYamlObject(
  aboutAllenYamlContent,
  {
    name: '',
    province: '',
    description: '',
    history: '',
    geography: '',
    economy: '',
    stats: [],
    timeline: [],
    card_description: '',
  }
);

export const aboutBetterGovData: AboutBetterGovData = parseYamlObject(
  aboutBetterGovYamlContent,
  {
    name: '',
    tagline: '',
    description: '',
    mission: '',
    why: '',
    benefits: [],
    card_description: '',
  }
);

export interface CategoryIndex {
  title?: string;
  description?: string;
  layout: 'grid' | 'list';
  pages: Subcategory[];
}

// Function to load category index data
export async function loadCategoryIndex(
  categorySlug: string
): Promise<CategoryIndex> {
  const yamlContent = categoryIndexMap[categorySlug];
  if (!yamlContent) {
    return { layout: 'list', pages: [] };
  }
  try {
    const indexData: CategoryIndexData = yaml.load(
      yamlContent
    ) as CategoryIndexData;
    return {
      title: indexData.title,
      description: indexData.description,
      layout: indexData.layout ?? 'list',
      pages: indexData.pages || [],
    };
  } catch (parseError) {
    console.warn(
      `Failed to parse YAML content for category ${categorySlug}:`,
      parseError
    );
    return { layout: 'list', pages: [] };
  }
}

// Function to get subcategories for a category (with caching)
const categoryCache = new Map<string, CategoryIndex>();

export async function getCategorySubcategories(
  categorySlug: string
): Promise<CategoryIndex> {
  if (categoryCache.has(categorySlug)) {
    return categoryCache.get(categorySlug)!;
  }

  const result = await loadCategoryIndex(categorySlug);
  categoryCache.set(categorySlug, result);
  return result;
}

/** Returns true if a slug has a registered index in categoryIndexMap */
export function isNestedCategory(slug: string): boolean {
  return slug in categoryIndexMap;
}
