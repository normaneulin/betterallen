import { useEffect, useMemo, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { MapPinIcon } from 'lucide-react';
import yaml from 'js-yaml';

import {
  SidebarContainer,
  SidebarItem,
} from '../../../../components/navigation/SidebarNavigation';

interface Barangay {
  slug: string;
  barangay_name: string;
}

function formatBarangayName(name: string) {
  return name.replace(/^BARANGAY /i, '').trim();
}

export default function BarangaysSidebar() {
  const [barangays, setBarangays] = useState<Barangay[]>([]);
  const location = useLocation();

  useEffect(() => {
    async function fetchData() {
      try {
        const resp = await fetch('/content/government/barangays/index.yaml');
        const text = await resp.text();
        const parsed = yaml.load(text);
        setBarangays(Array.isArray(parsed) ? parsed : []);
      } catch {
        setBarangays([]);
      }
    }
    fetchData();
  }, []);

  const sorted = useMemo(() => {
    return barangays
      .slice()
      .sort((a, b) => a.barangay_name.localeCompare(b.barangay_name));
  }, [barangays]);

  return (
    <SidebarContainer title="Barangays">
      {sorted.map(brgy => {
        const isActive = location.pathname.endsWith(brgy.slug);
        return (
          <Link
            key={brgy.slug}
            to={`/government/barangays/${brgy.slug}`}
            className="block"
          >
            <SidebarItem
              label={formatBarangayName(brgy.barangay_name)}
              icon={MapPinIcon}
              isActive={isActive}
            />
          </Link>
        );
      })}
    </SidebarContainer>
  );
}