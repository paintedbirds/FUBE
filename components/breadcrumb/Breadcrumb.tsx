import {
  Breadcrumb as ChakraBreadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/react';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

export interface Crumbs {
  path: string;
  title: string;
}

const Breadcrumb = () => {
  const pathname = usePathname();
  const [crumbs, setCrumbs] = useState<Crumbs[]>([]);

  const paths = useMemo(() => pathname?.split('/').splice(1), [pathname]);

  useEffect(() => {
    if (!paths) {
      return;
    }

    const breadcumb: Crumbs[] = paths.map((path, index) => {
      return {
        title: path.replace(
          /^(.)(.*)$/,
          (_, firstChar, restOfString) => firstChar.toUpperCase() + restOfString
        ),
        path: `/${paths.slice(0, index + 1).join('/')}`,
      };
    });
    setCrumbs(breadcumb);
  }, [paths]);

  return (
    <ChakraBreadcrumb>
      {crumbs.map((crumb, index) => (
        <BreadcrumbItem key={index} isCurrentPage={pathname === crumb.path}>
          <BreadcrumbLink href={crumb.path}>{crumb.title}</BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </ChakraBreadcrumb>
  );
};

export default Breadcrumb;
