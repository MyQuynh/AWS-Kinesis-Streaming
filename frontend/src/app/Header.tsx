import React from 'react';
import {
  Box,
  Stack,
  Heading,
  Flex,
  Text,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

interface HeaderProps {
  bgColor: string;
  color: string;
}

const Header: React.FC<HeaderProps> = ({ bgColor, color }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleToggle = () => (isOpen ? onClose() : onOpen());

  return (
    <>
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding={6}
        bg={bgColor}
        color={color}
      >
        <Flex align="center" mr={5}>
          <Heading as="h1" size="lg" letterSpacing="tighter">
            #HashSociety
          </Heading>
        </Flex>
        {/* Burger Menu on small screens */}
        <Box display={{ base: 'block', md: 'none' }} onClick={handleToggle}>
          <HamburgerIcon />
        </Box>

        {/* Menu Stack */}
        <Stack
          direction={{ base: 'column', md: 'row' }}
          display={{ base: isOpen ? 'block' : 'none', md: 'flex' }}
          width={{ base: 'full', md: 'auto' }}
          alignItems="center"
          flexGrow={1}
          mt={{ base: 4, md: 0 }}
        >
          <Text>Home</Text>
          <Text>Dashboard</Text>
        </Stack>

        <Box
          display={{ base: isOpen ? 'block' : 'none', md: 'block' }}
          mt={{ base: 4, md: 0 }}
        >
          {/* <Button
            variant="outline"
            _hover={{ bg: 'teal.700', borderColor: 'teal.700' }}
          >
            Create account
          </Button> */}
        </Box>
      </Flex>
    </>
  );
};

export default Header;
