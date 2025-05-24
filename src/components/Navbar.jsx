import {
  Box,
  Flex,
  Button,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Text,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Link as ScrollLink } from "react-scroll";

const NavLink = ({ to, children }) => {
  return (
    <ScrollLink
      to={to}
      smooth={true}
      duration={500}
      offset={-70} // Adjust if your navbar is sticky
      spy={true}
    >
      <Box
        px={2}
        py={1}
        rounded={"md"}
        cursor="pointer"
        _hover={{
          textDecoration: "none",
          bg: useColorModeValue("gray.200", "gray.700"),
        }}
      >
        {children}
      </Box>
    </ScrollLink>
  );
};

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")} px={4} position="sticky" top="0" zIndex="100">
      <Flex h={"8vh"} alignItems={"center"} justifyContent={"space-between"}>
        <Text fontSize={"18px"} fontWeight={600}>
          NEUSTAR
        </Text>

        <Flex alignItems={"center"}>
          <Stack direction={"row"} spacing={7} alignItems="center">
            <NavLink to="home">Home</NavLink>
            <NavLink to="blog">Blog</NavLink>
            <NavLink to="contact">Contact</NavLink>


            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
}
