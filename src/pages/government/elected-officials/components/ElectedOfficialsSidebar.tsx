/*
import { BookOpenIcon, Gavel } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function ElectedOfficialsSidebar() {
	const location = useLocation();
	const navItems = [
		{
			label: 'Elected Officials',
			icon: Gavel,
			path: '/government/elected-officials',
		},
		{
			label: 'Municipal Committees',
			icon: BookOpenIcon,
			path: '/government/elected-officials/committees',
		},
	];

	return (
		<nav className="flex flex-col gap-2 p-4">
			<div className="mb-2 text-xs font-bold uppercase text-gray-500">Navigation</div>
			{navItems.map(item => {
				const isActive = location.pathname === item.path;
				const Icon = item.icon;
				return (
					<Link
						key={item.path}
						to={item.path}
						className={`flex items-center gap-2 rounded px-3 py-2 text-sm font-medium transition-colors ${
							isActive
								? 'bg-primary-100 text-primary-700 font-bold'
								: 'hover:bg-gray-100 text-gray-700'
						}`}
					>
						<Icon className="h-4 w-4" />
						{item.label}
					</Link>
				);
			})}
		</nav>
	);
}
*/

import { BookOpenIcon, BuildingIcon } from 'lucide-react';

import {
  SidebarContainer,
  SidebarGroup,
  SidebarItem,
} from '@/components/navigation/SidebarNavigation';

export default function ElectedOfficialsSidebar() {
  const groups = [
    {
      title: 'Officials',
      items: [
        {
          label: 'Elected Officials',
          icon: BuildingIcon,
          path: '/government/elected-officials',
        },
      ],
    },
    {
      title: 'Legislative',
      items: [
        {
          label: 'Committees',
          icon: BookOpenIcon,
          path: '/government/elected-officials/committees',
        },
      ],
    },
  ];

  return (
    <SidebarContainer title="Municipal Government">
      {groups.map(group => (
        <SidebarGroup key={group.title} title={group.title}>
          {group.items.map(item => (
            <SidebarItem key={item.path} {...item} />
          ))}
        </SidebarGroup>
      ))}
    </SidebarContainer>
  );
}
