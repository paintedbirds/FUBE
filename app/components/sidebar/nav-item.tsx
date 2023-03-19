import { Link } from '@chakra-ui/react';

interface NavItemProps {
  route: string;
  label: string;
}

export const NavItem = ({ route, label }: NavItemProps) => {
  return (
    <li>
      <Link
        fontWeight={700}
        color="#000000AB"
        href={route}
      >
        {label}
      </Link>
    </li>
  );
};
