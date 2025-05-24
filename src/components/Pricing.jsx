
import {
  Box,
  Text,
  Heading,
  Button,
  VStack,
  HStack,
  Icon,
  Badge,
  Container,
  SimpleGrid,
  useColorModeValue,
} from '@chakra-ui/react';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';

const PricingPlan = ({ title, price, description, features, isPopular = false }) => {
  const defaultBorderColor = useColorModeValue('gray.200', 'gray.700');
const borderColor = isPopular ? 'blue.500' : defaultBorderColor;


  return (
    <Box
      borderWidth="1px"
      borderRadius="xl"
      overflow="hidden"
      boxShadow="md"
      transition="all 0.3s"
      _hover={{ transform: 'translateY(-4px)', boxShadow: 'lg' }}
      borderColor={borderColor}
      bg={useColorModeValue('white', 'gray.800')}
      position="relative"
    >
      {isPopular && (
        <Badge
          colorScheme="blue"
          fontSize="xs"
          textAlign="center"
          py="1"
          top="0"
          w="full"
          borderTopRadius="xl"
        >
          Most Popular
        </Badge>
      )}

      <Box p={8}>
        <Heading fontSize="2xl" mb={2}>
          {title}
        </Heading>
        <Text fontSize="4xl" fontWeight="bold">
          {price}
          {price !== 'Custom' && <Text as="span" fontSize="md" color="gray.500">/month</Text>}
        </Text>
        <Text color="gray.600" my={4}>
          {description}
        </Text>
        <Button
          w="full"
          colorScheme={isPopular ? 'blue' : 'gray'}
          variant={isPopular ? 'solid' : 'outline'}
          mt={4}
        >
          {price === 'Custom' ? 'Contact Sales' : 'Get Started'}
        </Button>
      </Box>

      <Box bg={useColorModeValue('gray.50', 'gray.700')} p={8}>
        <VStack align="start" spacing={4}>
          {features.map((feature, index) => (
            <HStack key={index} align="start">
              <Icon
                as={feature.included ? CheckIcon : CloseIcon}
                color={feature.included ? 'green.500' : 'gray.400'}
                boxSize={5}
                mt={1}
              />
              <Text color={feature.included ? 'gray.800' : 'gray.500'}>
                {feature.text}
              </Text>
            </HStack>
          ))}
        </VStack>
      </Box>
    </Box>
  );
};

const Pricing = () => {
  const plans = [
    {
      title: "Starter",
      price: "$29",
      description: "Perfect for small teams and startups.",
      features: [
        { text: "Up to 5 team members", included: true },
        { text: "20GB storage", included: true },
        { text: "Basic analytics", included: true },
        { text: "24/7 support", included: false },
        { text: "Custom branding", included: false },
        { text: "Advanced security", included: false },
        { text: "API access", included: false },
      ]
    },
    {
      title: "Professional",
      price: "$79",
      description: "Ideal for growing businesses.",
      features: [
        { text: "Up to 15 team members", included: true },
        { text: "100GB storage", included: true },
        { text: "Advanced analytics", included: true },
        { text: "24/7 priority support", included: true },
        { text: "Custom branding", included: true },
        { text: "Advanced security", included: false },
        { text: "API access", included: true },
      ],
      isPopular: true
    },
    {
      title: "Enterprise",
      price: "Custom",
      description: "For large organizations with specific needs.",
      features: [
        { text: "Unlimited team members", included: true },
        { text: "Unlimited storage", included: true },
        { text: "Custom analytics", included: true },
        { text: "24/7 dedicated support", included: true },
        { text: "Custom branding", included: true },
        { text: "Enterprise-grade security", included: true },
        { text: "Custom API integration", included: true },
      ]
    }
  ];

  return (
    <Box py={{ base: 12, md: 20 }} px={4}>
      <Container maxW="7xl" textAlign="center" mb={12}>
        <Heading as="h2" size="xl" mb={4}>
          Simple, Transparent Pricing
        </Heading>
        <Text fontSize="lg" color="gray.600">
          Choose the plan that works best for your team. No hidden fees or contracts.
        </Text>
      </Container>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} maxW="7xl" mx="auto">
        {plans.map((plan, index) => (
          <PricingPlan key={index} {...plan} />
        ))}
      </SimpleGrid>

      <Box textAlign="center" mt={12}>
        <Text color="gray.600" mb={4}>
          All plans include a 14-day free trial. No credit card required.
        </Text>
        <Button variant="link" colorScheme="blue">
          View full plan comparison →
        </Button>
      </Box>
    </Box>
  );
};

export default Pricing;
