import React from 'react';
import {
  Box,
  Container,
  SimpleGrid,
  Text,
  Heading,
  Link,
  VStack,
  HStack,
  useColorModeValue,
  Divider,
  Stack,
} from '@chakra-ui/react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
  const bg = useColorModeValue('gray.100', 'gray.900');
  const text = useColorModeValue('gray.700', 'gray.300');
  const heading = useColorModeValue('gray.900', 'white');

  return (
    <Box bg={bg} color={text} pt={16} pb={6}>
      <Container maxW="6xl">
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 5 }}
          spacing={{ base: 10, lg: 6 }}
          mb={12}
          alignItems="start"   // Important for vertical alignment
        >
          {/* Company Info spanning 2 columns */}
          <Box gridColumn={{ base: 'auto', lg: 'span 2' }} px={2}>
            <Heading as="a" href="#" fontSize="2xl" mb={4} color={heading}>
              Neustar
            </Heading>
            <Text maxW="md" mb={6}>
              The all-in-one platform that helps your team collaborate, manage projects, and deliver results faster than ever before.
            </Text>
            <HStack spacing={4} align="center" ml={28}>
              <Link href="#" isExternal aria-label="Facebook"><FaFacebook size={20} /></Link>
              <Link href="#" isExternal aria-label="Twitter"><FaTwitter size={20} /></Link>
              <Link href="#" isExternal aria-label="Instagram"><FaInstagram size={20} /></Link>
              <Link href="#" isExternal aria-label="LinkedIn"><FaLinkedin size={20} /></Link>
              <Link href="#" isExternal aria-label="GitHub"><FaGithub size={20} /></Link>
            </HStack>
          </Box>

          {/* Product */}
          <Box px={4}>
            <Heading fontSize="lg" mb={4} color={heading}>Product</Heading>
            <VStack align="center" spacing={3}>
              <Link href="#features">Features</Link>
              <Link href="#pricing">Pricing</Link>
              <Link href="#">Integrations</Link>
              <Link href="#">Changelog</Link>
              <Link href="#">Roadmap</Link>
            </VStack>
          </Box>

          {/* Resources */}
          <Box px={2}>
            <Heading fontSize="lg" mb={4} color={heading}>Resources</Heading>
            <VStack align="center" spacing={3}>
              <Link href="#">Documentation</Link>
              <Link href="#">Tutorials</Link>
              <Link href="#">Blog</Link>
              <Link href="#">Support Center</Link>
              <Link href="#">API Reference</Link>
            </VStack>
          </Box>

          {/* Company */}
          <Box px={2}>
            <Heading fontSize="lg" mb={4} color={heading}>Company</Heading>
            <VStack align="center" spacing={3}>
              <Link href="#">About Us</Link>
              <Link href="#">Careers</Link>
              <Link href="#">Contact</Link>
              <Link href="#">Privacy Policy</Link>
              <Link href="#">Terms of Service</Link>
            </VStack>
          </Box>
        </SimpleGrid>

        <Divider borderColor={useColorModeValue('gray.300', 'gray.700')} mb={6} />

        <Stack
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          align="center"
          spacing={4}
        >
          <Text fontSize="sm">© {new Date().getFullYear()} Neustar. All rights reserved.</Text>
          <HStack spacing={6} fontSize="sm">
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms of Service</Link>
            <Link href="#">Cookie Policy</Link>
          </HStack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
