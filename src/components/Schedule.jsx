import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Icon,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';
import { Calendar } from 'lucide-react';

const Schedule = () => {
  // Light/Dark mode colors
  const bgGradient = useColorModeValue(
    'linear(to-b, gray.50, white)',
    'linear(to-b, gray.800, gray.900)'
  );
  const boxBg = useColorModeValue('white', 'gray.700');
  const headingColor = useColorModeValue('gray.900', 'gray.100');
  const textColor = useColorModeValue('gray.600', 'gray.400');
  const placeholderBg = useColorModeValue('gray.100', 'gray.600');
  const placeholderTextColor = useColorModeValue('gray.500', 'gray.300');
  const iconColor = useColorModeValue('gray.400', 'gray.400');

  return (
    <Box py="24" bgGradient={bgGradient}>
      <Container maxW="4xl" px={{ base: 4, sm: 6, lg: 8 }}>
        <VStack spacing={8} textAlign="center">
          <Box>
            <Heading
              as="h2"
              fontFamily="serif"
              fontSize={{ base: '4xl', md: '5xl' }}
              color={headingColor}
              mb={4}
            >
              Let's Connect
            </Heading>
            <Text fontSize="lg" color={textColor}>
              Schedule a conversation about innovation, technology, and the future.
            </Text>
          </Box>

          <Box
            bg={boxBg}
            borderRadius="2xl"
            boxShadow="xl"
            p={{ base: 8, md: 12 }}
            w="100%"
          >
            <Flex align="center" justify="center" mb={8}>
              <Icon as={Calendar} boxSize={8} color={iconColor} />
            </Flex>

            {/* Calendly Placeholder */}
            <Box
              position="relative"
              pt="56.25%" // 16:9 aspect ratio
              bg={placeholderBg}
              borderRadius="lg"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Text color={placeholderTextColor} position="absolute">
                Calendly Embed Placeholder
              </Text>
            </Box>

            <Text mt={8} fontSize="sm" color={placeholderTextColor} textAlign="center">
              Typically responds within 24 hours
            </Text>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default Schedule;
