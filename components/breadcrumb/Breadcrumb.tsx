import {
  Breadcrumb as ChakraBreadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/react';
import { usePathname } from 'next/navigation';

export interface Crumbs {
  path: string;
  title: string;
}

interface Breadcrumb {
  crumbs: Crumbs[];
}

const Breadcrumb = ({ crumbs }: Breadcrumb) => {
  const pathname = usePathname();

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
