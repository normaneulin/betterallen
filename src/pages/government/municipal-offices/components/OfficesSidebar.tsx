import { useEffect, useMemo, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Building2Icon } from 'lucide-react';
import yaml from 'js-yaml';
import { officeIcons } from '../../../../lib/officeIcons';
import {
  SidebarContainer,
  SidebarGroup,
  SidebarItem,
} from '../../../../components/navigation/SidebarNavigation';

function formatGovName(name: string) {
  return name.replace(/MUNICIPAL |LOCAL |DEPARTMENT OF /gi, '').trim();
}

export default function OfficesSidebar() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [offices, setOffices] = useState<any[]>([]);
  const location = useLocation();

  useEffect(() => {
    async function fetchData() {
      try {
        const resp = await fetch('/content/government/municipal-offices/index.yaml');
        const text = await resp.text();
        const parsed = yaml.load(text);
        setOffices(Array.isArray(parsed) ? parsed : []);
      } catch {
        setOffices([]);
      }
    }
    fetchData();
  }, []);

  const sorted = useMemo(() => {
    return offices.slice().sort((a, b) => formatGovName(a.office_name).localeCompare(formatGovName(b.office_name)));
  }, [offices]);

  return (
    <SidebarContainer title="Municipal Offices">
      <SidebarGroup title="Directory">
        {sorted.map(office => {
          const Icon = officeIcons[office.slug] || Building2Icon;
          const isActive = location.pathname.endsWith(office.slug);
          return (
            <Link 
              key={office.slug} 
              to={"/government/municipal-offices/" + office.slug}
              className="block"
            >
              <SidebarItem
                label={formatGovName(office.office_name)}
                icon={Icon}
                isActive={isActive}
              />
            </Link>
          );
        })}
      </SidebarGroup>
    </SidebarContainer>
  );
}