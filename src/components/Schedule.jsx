import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Icon,
  Flex,
} from '@chakra-ui/react';
import { Calendar } from 'lucide-react';

const Schedule = () => {
  return (
    <Box py="24" bgGradient="linear(to-b, gray.50, white)">
      <Container maxW="4xl" px={{ base: 4, sm: 6, lg: 8 }}>
        <VStack spacing={8} textAlign="center">
          <Box>
            <Heading
              as="h2"
              fontFamily="serif"
              fontSize={{ base: '4xl', md: '5xl' }}
              color="gray.900"
              mb={4}
            >
              Let's Connect
            </Heading>
            <Text fontSize="lg" color="gray.600">
              Schedule a conversation about innovation, technology, and the future.
            </Text>
          </Box>

          <Box
            bg="white"
            borderRadius="2xl"
            boxShadow="xl"
            p={{ base: 8, md: 12 }}
            w="100%"
          >
            <Flex align="center" justify="center" mb={8}>
              <Icon as={Calendar} boxSize={8} color="gray.400" />
            </Flex>

            {/* Calendly Placeholder */}
            <Box
              position="relative"
              pt="56.25%" // 16:9 aspect ratio
              bg="gray.100"
              borderRadius="lg"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Text color="gray.500" position="absolute">
                Calendly Embed Placeholder
              </Text>
            </Box>

            <Text mt={8} fontSize="sm" color="gray.500" textAlign="center">
              Typically responds within 24 hours
            </Text>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default Schedule;
