import React from 'react';
import {
  Box,
  Text,
  Heading,
  Container,
  Stack,
  useColorModeValue,
  Flex,
} from '@chakra-ui/react';

const achievements = [
  {
    year: '2024',
    title: 'Founded TechVision Labs',
    description: 'Pioneering the future of human-computer interaction',
  },
  {
    year: '2023',
    title: 'Innovation Award Winner',
    description: 'Global Technology Summit - Best Emerging Technology',
  },
  {
    year: '2022',
    title: 'Published Research Paper',
    description: 'Nature Journal - "The Future of Ambient Computing"',
  },
  {
    year: '2021',
    title: 'TEDx Speaker',
    description: 'The Convergence of Art and Technology',
  },
];

const Timeline = () => {
  const lineColor = useColorModeValue('gray.300', 'gray.600');
  const cardBg = useColorModeValue('gray.50', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'gray.100');

  return (
    <Box py={{ base: 16, md: 24 }} bg={useColorModeValue('white', 'gray.800')}>
      <Container maxW="4xl">
        <Heading
          fontSize={{ base: '3xl', md: '4xl' }}
          textAlign="center"
          mb={16}
        >
          Journey & Achievements
        </Heading>

        <Box position="relative" pl={{ base: 4, md: 8 }}>
          {/* Vertical line */}
          <Box
            position="absolute"
            left="20px"
            top={0}
            bottom={0}
            width="2px"
            bg={lineColor}
            zIndex={0}
          />

          <Stack spacing={12} zIndex={1} position="relative">
            {achievements.map((achievement, index) => (
              <Flex key={index} align="flex-start" position="relative">
                {/* Dot */}
                <Box
                  w="12px"
                  h="12px"
                  bg="blue.500"
                  borderRadius="full"
                  mt="6px"
                  position="absolute"
                  left="14px"
                  zIndex={1}
                />

                {/* Card */}
                <Box
                  ml={10}
                  bg={cardBg}
                  p={6}
                  borderRadius="xl"
                  boxShadow="md"
                  width="full"
                >
                  <Text fontSize="lg" fontWeight="bold" color="blue.600" mb={1}>
                    {achievement.year}
                  </Text>
                  <Text fontSize="xl" fontWeight="semibold" color={textColor} mb={2}>
                    {achievement.title}
                  </Text>
                  <Text color={textColor}>{achievement.description}</Text>
                </Box>
              </Flex>
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Timeline;
