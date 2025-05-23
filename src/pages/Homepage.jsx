import { Box } from "@chakra-ui/react";
import React from "react";
import ThreeSpotlight from "../components/ThreeSpotlight";

const Homepage = () => {
  return (
    <Box>
      <Box w={"100%"} h={"92vh"}>
        <ThreeSpotlight />
      </Box>
    </Box>
  );
};

export default Homepage;
