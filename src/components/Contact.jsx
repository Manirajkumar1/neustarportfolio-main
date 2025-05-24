import React from 'react';
import {
  Box,
  Container,
  SimpleGrid,
  Heading,
  Text,
  VStack,
  Input,
  Textarea,
  Button,
  FormControl,
  FormLabel,
  IconButton,
  useColorMode,
  useColorModeValue,
  HStack,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

const Contact = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue('white', 'gray.900');
  const text = useColorModeValue('gray.700', 'gray.200');
  const heading = useColorModeValue('gray.900', 'white');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <Box py={16} bg={bg}>
      <Container maxW="6xl">
        {/* Light/Dark Toggle */}
        <Box textAlign="right" mb={6}>
          <IconButton
            aria-label="Toggle theme"
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
          />
        </Box>

        {/* Section Header */}
        <Box textAlign="center" mb={12}>
          <Heading fontFamily="serif" fontSize="4xl" color={heading} mb={2}>
            Get in Touch
          </Heading>
          <Text fontSize="lg" color={text}>
            Let's discuss how we can shape the future together
          </Text>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={12}>
          {/* Left Side: Contact Info */}
          <Box>
            <Heading fontSize="2xl" fontFamily="serif" mb={4} color={heading}>
              Connect With Me
            </Heading>
            <Text color={text} mb={6}>
              Whether you're interested in collaboration, innovation, or just want to chat about the future of technology, I'm always open to meaningful conversations.
            </Text>

            <HStack spacing={2} ml={32}>
              <Button as="a" href="#" variant="outline" colorScheme="gray" size="sm">
                GitHub
              </Button>
              <Button as="a" href="#" variant="outline" colorScheme="linkedin" size="sm">
                LinkedIn
              </Button>
              <Button as="a" href="#" variant="outline" colorScheme="twitter" size="sm">
                Twitter
              </Button>
            </HStack>

          </Box>

          {/* Right Side: Form */}
          <Box as="form" onSubmit={handleSubmit}>
            <VStack spacing={6}>
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input placeholder="Your name" />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input type="email" placeholder="you@example.com" />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Message</FormLabel>
                <Textarea rows={4} placeholder="Your message" />
              </FormControl>

              <Button colorScheme="blue" type="submit">
                Send Message
              </Button>
            </VStack>
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Contact;
