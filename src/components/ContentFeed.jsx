import {
  Box,
  Image,
  Heading,
  Text,
  Badge,
  Stack,
  Icon,
  Link,
  SimpleGrid,
  Container,
  useColorModeValue,
  Flex,
} from '@chakra-ui/react';
import { ExternalLink, Youtube, Tag } from 'lucide-react';

const content = [
  {
    type: 'blog',
    title: 'The Future of Human-Computer Interaction',
    description: 'Exploring the next frontier of technology and human experience through the lens of classical design principles.',
    image: 'https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg',
    tags: ['Technology', 'Innovation', 'Design'],
    link: '#',
  },
  {
    type: 'video',
    title: 'Renaissance of Technology',
    description: 'A visual journey through the intersection of classical art and modern innovation.',
    image: 'https://images.pexels.com/photos/7034639/pexels-photo-7034639.jpeg',
    tags: ['Art', 'Technology', 'Future'],
    link: '#',
  },
  {
    type: 'blog',
    title: 'Crafting Digital Experiences',
    description: 'How traditional craftsmanship principles inform modern digital design.',
    image: 'https://images.pexels.com/photos/3913025/pexels-photo-3913025.jpeg',
    tags: ['Design', 'Craft', 'Digital'],
    link: '#',
  },
];

const ContentCard = ({ content }) => {
  const bg = useColorModeValue('white', 'gray.800');
  const text = useColorModeValue('gray.700', 'gray.100');
  const border = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box
      bg={bg}
      borderWidth="1px"
      borderColor={border}
      rounded="xl"
      overflow="hidden"
      shadow="md"
      transition="all 0.3s"
      _hover={{ shadow: 'lg' }}
    >
      <Box position="relative">
        <Image
          src={content.image}
          alt={content.title}
          objectFit="cover"
          w="full"
          h="200px"
        />
        {content.type === 'video' && (
          <Flex
            position="absolute"
            top="0"
            left="0"
            right="0"
            bottom="0"
            bg="blackAlpha.500"
            align="center"
            justify="center"
          >
            <Icon as={Youtube} w={10} h={10} color="whiteAlpha.900" />
          </Flex>
        )}
      </Box>

      <Box p={6}>
        <Stack direction="row" wrap="wrap" spacing={2} mb={4}>
          {content.tags.map((tag, idx) => (
            <Badge
              key={idx}
              colorScheme="blue"
              variant="subtle"
              fontSize="xs"
              px={2}
              py={1}
              rounded="full"
              display="flex"
              alignItems="center"
            >
              <Icon as={Tag} w={3} h={3} mr={1} />
              {tag}
            </Badge>
          ))}
        </Stack>

        <Heading size="md" mb={2} fontFamily="serif">
          {content.title}
        </Heading>

        <Text color={text} fontSize="sm" mb={4}>
          {content.description}
        </Text>

        <Link
          href={content.link}
          color="blue.500"
          fontWeight="medium"
          display="inline-flex"
          alignItems="center"
          _hover={{ color: 'blue.600' }}
        >
          Read More <Icon as={ExternalLink} ml={1} w={4} h={4} />
        </Link>
      </Box>
    </Box>
  );
};

const ContentFeed = () => {
  const bg = useColorModeValue('gray.50', 'gray.900');
  const headingColor = useColorModeValue('gray.800', 'whiteAlpha.900');
  const subText = useColorModeValue('gray.600', 'gray.400');

  return (
      <Box py={24} bg={bg}>
      <Container maxW="6xl">
        <Box textAlign="center" mb={16}>
          <Heading fontSize={{ base: '3xl', md: '4xl' }} color={headingColor} mb={4}>
            Thoughts & Media
          </Heading>
          <Text fontSize="lg" color={subText}>
            Exploring the intersection of classical principles and future technology
          </Text>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
          {content.map((item, idx) => (
            <ContentCard key={idx} content={item} />
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default ContentFeed;
