import { useState, useEffect } from 'react';
import {
  Collapse,
  Flex,
  FlexProps,
  IconProps,
  Link,
  Tooltip,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItemProps extends FlexProps {
  icon: IconProps;
  label: string;
  route: string;
  showLabel: boolean;
}

export const NavItem = ({
  label,
  icon,
  route,
  showLabel,
  ...leftOverProps
}: NavItemProps) => {
  const pathname = usePathname();
  const [dinamicProps, setDinamicProps] = useState<FlexProps>({});

  useEffect(() => {
    const props: FlexProps = {};
    props.color = pathname === route ? '#2843B2' : '#000000AB';
    props.backgroundColor = pathname === route ? '#2843B21A' : 'white';
    setDinamicProps(props);
  }, [pathname, route]);

  return (
    <Link
      as={NextLink}
      href={route}
      fontWeight={700}
      style={{ textDecoration: 'none', marginBottom: '0.7rem' }}
      _focus={{ boxShadow: 'none' }}
    >
      <Tooltip label={label} placement="auto">
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          gap="22px"
          _active={{ bg: '#2843B21A' }}
          _hover={{ color: '#2843B2' }}
          {...leftOverProps}
          {...dinamicProps}
        >
          <>
            {icon}
            <Collapse in={showLabel} animateOpacity>
              {label}
            </Collapse>
          </>
        </Flex>
      </Tooltip>
    </Link>
  );
};
