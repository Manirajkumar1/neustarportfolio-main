import {
  Box,
  Flex,
  Button,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Text,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Link as ScrollLink } from "react-scroll";

const NavLink = ({ to, children, onClick }) => (
  <ScrollLink
    to={to}
    smooth={true}
    duration={500}
    offset={-70}
    spy={true}
    onClick={onClick}
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

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      bg={useColorModeValue("gray.100", "gray.900")}
      px={4}
      position="sticky"
      top="0"
      zIndex="100"
    >
      <Flex h={"8vh"} alignItems={"center"} justifyContent={"space-between"}>
        {/* Hamburger (left side on mobile) */}
        <IconButton
          display={{ base: "flex", md: "none" }}
          onClick={onOpen}
          icon={<HamburgerIcon />}
          variant="ghost"
          aria-label="Open Menu"
        />

        {/* Logo (only visible on md and up) */}
        <Text
          fontSize={"18px"}
          fontWeight={600}
          display={{ base: "none", md: "block" }}
          mx="auto"
        >
          NEUSTAR
        </Text>

        {/* Desktop Navigation (right side) */}
        <Flex display={{ base: "none", md: "flex" }} alignItems={"center"}>
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

      {/* Mobile Drawer */}
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent bg={useColorModeValue("white", "gray.800")}>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <Stack spacing={4}>
              <NavLink to="home" onClick={onClose}>Home</NavLink>
              <NavLink to="blog" onClick={onClose}>Blog</NavLink>
              <NavLink to="contact" onClick={onClose}>Contact</NavLink>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
