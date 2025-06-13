'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface ProfileNavLinkProps {
  href: string;
  label: string;
}

export default function ProfileSidebarNavLink({ href, label }: ProfileNavLinkProps) {
  const pathname = usePathname();
  const pathnameWithoutQuery = pathname.split('?')[0];
  const hrefWithoutQuery = href.split('?')[0];

  const isActive =
    pathnameWithoutQuery === hrefWithoutQuery ||
    (hrefWithoutQuery !== '/profile' && pathnameWithoutQuery.startsWith(hrefWithoutQuery + '/'));

  return (
    <Link
      href={href}
      className={`
        block px-[15px] py-[10px] rounded-xl transition-colors font-medium text-sm sm:text-base
        ${isActive ? 'bg-rose text-white' : 'text-gray-700 lg:hover:bg-rose/10 lg:hover:text-rose'}
      `}
    >
      {label}
    </Link>
  );
}
