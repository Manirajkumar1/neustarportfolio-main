import React, { useRef, useState } from 'react';
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
  HStack,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import emailjs from 'emailjs-com';

const Contact = () => {
  const form = useRef();
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE_ID,
        form.current,
        process.env.REACT_APP_PUBLIC_KEY
      )
      .then(
        (result) => {
          toast({
            title: 'Message Sent.',
            description: "We'll get back to you soon.",
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
          form.current.reset();
        },
        (error) => {
          toast({
            title: 'Error',
            description: 'Something went wrong. Please try again.',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        }
      )
      .finally(() => setLoading(false));
  };

  // Colors based on mode
  const bgColor = useColorModeValue('white', 'gray.900');
  const textColor = useColorModeValue('gray.700', 'gray.300');
  const headingColor = useColorModeValue('gray.900', 'whiteAlpha.900');
  const inputBg = useColorModeValue('gray.50', 'gray.800');
  const inputBorder = useColorModeValue('gray.200', 'gray.600');

  return (
    <Box py={16} bg={bgColor}>
      <Container maxW="6xl">
        {/* Section Header */}
        <Box textAlign="center" mb={12}>
          <Heading fontFamily="serif" fontSize="4xl" color={headingColor} mb={2}>
            Get in Touch
          </Heading>
          <Text fontSize="lg" color={textColor}>
            Let's discuss how we can shape the future together
          </Text>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={12}>
          {/* Left Side: Contact Info */}
          <Box>
            <Heading fontSize="2xl" fontFamily="serif" mb={4} color={headingColor}>
              Connect With Me
            </Heading>
            <Text color={textColor} mb={6}>
              Whether you're interested in collaboration, innovation, or just want to chat about the future of technology, I'm always open to meaningful conversations.
            </Text>

            <HStack spacing={2} ml={{ base: 0, md: 32 }}>
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
          <Box as="form" ref={form} onSubmit={handleSubmit}>
            <VStack spacing={6}>
              <FormControl isRequired>
                <FormLabel color={headingColor}>Name</FormLabel>
                <Input
                  name="user_name"
                  placeholder="Your name"
                  bg={inputBg}
                  borderColor={inputBorder}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel color={headingColor}>Email</FormLabel>
                <Input
                  name="user_email"
                  type="email"
                  placeholder="you@example.com"
                  bg={inputBg}
                  borderColor={inputBorder}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel color={headingColor}>Message</FormLabel>
                <Textarea
                  name="message"
                  rows={4}
                  placeholder="Your message"
                  bg={inputBg}
                  borderColor={inputBorder}
                />
              </FormControl>

              <Button
                colorScheme="blue"
                type="submit"
                isLoading={loading}
                loadingText="Sending"
              >
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
