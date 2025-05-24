import React from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  Container,
} from "@chakra-ui/react";

const CalendlyBooking = () => {
  // Color mode values
  const bg = useColorModeValue("gray.50", "gray.800");
  const headingColor = useColorModeValue("gray.900", "whiteAlpha.900");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  return (
    <Box py={16} bg={bg}>
      <Container maxW="6xl">
        <VStack spacing={6} textAlign="center" mb={12}>
          <Heading fontSize="4xl" color={headingColor}>
            Book a Meeting
          </Heading>
          <Text fontSize="lg" color={textColor}>
            Choose a time slot that works best for you.
          </Text>
        </VStack>

        {/* Responsive and full-height Calendly iframe */}
        <Box
          w="100%"
          minH="1000px"
          border={`1px solid ${borderColor}`}
          borderRadius="lg"
          overflow="hidden"
        >
          <iframe
            src="https://calendly.com/manirajsingh7667/30min"
            width="100%"
            height="1000px"
            frameBorder="0"
            title="Calendly Booking"
            style={{ minWidth: "320px", border: "none" }}
            scrolling="no"
          ></iframe>
        </Box>
      </Container>
    </Box>
  );
};

export default CalendlyBooking;
