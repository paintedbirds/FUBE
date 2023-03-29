import { Flex, FlexProps, IconProps, Link } from '@chakra-ui/react';

interface NavItemProps extends FlexProps {
  icon: IconProps;
  label: string;
  route: string;
}

export const NavItem = ({
  label,
  icon,
  route,
  ...leftOverProps
}: NavItemProps) => {
  return (
    <Link
      href={route}
      fontWeight={700}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        gap="22px"
        color="#000000AB"
        _hover={{
          bg: 'white',
          color: '#2843B2',
        }}
        {...leftOverProps}
      >
        <>
          {icon}
          {label}
        </>
      </Flex>
    </Link>
  );
};
