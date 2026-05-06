import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { loadCategoryIndex, serviceCategories } from '../../data/yamlLoader';
import { useDebounce } from '../../hooks/useDebounce';

interface SearchResult {
  title: string;
  slug: string;
  categorySlug: string;
  description?: string;
  type: string;
  icon?: string;
}

interface SearchBarProps {
  placeholder?: string;
  maxResults?: number;
  className?: string;
  variant?: 'split' | 'pill';
}

const SearchBar = ({
  placeholder,
  maxResults = 8,
  className = '',
  variant = 'split',
}: SearchBarProps) => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 200);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;

    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, idx) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={idx} className="bg-yellow-200 font-semibold">
          {part}
        </mark>
      ) : (
        <span key={idx}>{part}</span>
      )
    );
  };

  const formatTypeBadge = (type?: string) => {
    if (!type) return 'Service';
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  useEffect(() => {
    if (!debouncedSearchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const search = async () => {
      const results: SearchResult[] = [];
      const query = debouncedSearchQuery.toLowerCase();

      for (const category of serviceCategories.categories || []) {
        if (category.category.toLowerCase().includes(query)) {
          results.push({
            title: category.category,
            slug: category.slug,
            categorySlug: category.slug,
            description: category.description,
            type: category.type,
            icon: category.icon,
          });
        }

        try {
          const index = await loadCategoryIndex(category.slug);
          for (const page of index.pages || []) {
            if (
              page.name.toLowerCase().includes(query) ||
              (page.description?.toLowerCase().includes(query) ?? false)
            ) {
              results.push({
                title: page.name,
                slug: page.slug,
                categorySlug: category.slug,
                description: page.description,
                type: category.type,
              });
            }
          }
        } catch {
          console.warn(`Failed to search category ${category.slug}`);
        }
      }

      setSearchResults(results.slice(0, maxResults));
    };

    search();
  }, [debouncedSearchQuery, maxResults]);

  const isPill = variant === 'pill';

  return (
    <div className={className}>
      <div className="relative">
        {isPill ? (
          <div className="relative w-full rounded-full bg-white/95 shadow-sm ring-1 ring-white/30">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-primary-600" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              placeholder={
                placeholder ||
                t('hero.search_placeholder') ||
                'Search services...'
              }
              className="h-11 w-full rounded-full border-0 bg-transparent pl-11 pr-5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-white/40"
            />
          </div>
        ) : (
          <div className="flex">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              placeholder={
                placeholder ||
                t('hero.search_placeholder') ||
                'Search services...'
              }
              className="text-black min-w-0 flex-1 rounded-l-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-600"
            />
            <button
              type="button"
              className="flex items-center gap-2 rounded-r-lg bg-primary-600 px-4 py-3 transition-colors hover:bg-primary-700"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>
        )}

        {isInputFocused && debouncedSearchQuery.trim() && (
          <div
            className="absolute top-full left-0 right-0 z-10 mt-1 max-h-96 overflow-y-auto rounded-lg border border-gray-300 bg-white shadow-lg"
            onMouseDown={e => e.preventDefault()}
          >
            {searchResults.length > 0 ? (
              searchResults.map((result, idx) => (
                <Link
                  key={idx}
                  to={
                    result.icon
                      ? `/services/${result.slug}`
                      : `/services/${result.categorySlug}/${result.slug}`
                  }
                  onClick={() => {
                    setSearchQuery('');
                    setIsInputFocused(false);
                  }}
                  className="block px-3 py-2 text-left transition-colors hover:bg-primary-50 border-b border-gray-100 last:border-b-0"
                >
                  <p className="line-clamp-1 text-left text-sm font-medium leading-5 text-gray-900">
                    {highlightText(result.title, searchQuery)}{' '}
                    <span className="align-middle rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700 whitespace-nowrap">
                      {formatTypeBadge(result.type)}
                    </span>
                  </p>
                  {result.description && (
                    <p className="line-clamp-1 text-left text-xs leading-4 text-gray-600">
                      {highlightText(result.description, searchQuery)}
                    </p>
                  )}
                </Link>
              ))
            ) : (
              <div className="p-4 text-center">
                <p className="text-sm text-gray-500">
                  {t('hero.no_results') || 'No results found'}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
