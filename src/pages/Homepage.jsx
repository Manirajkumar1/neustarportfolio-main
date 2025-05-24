import { Box } from "@chakra-ui/react";
import React from "react";
import ThreeSpotlight from "../components/ThreeSpotlight";
import Schedule from "../components/Schedule";
import Timeline from "../components/Timeline";
import ContentFeed from "../components/ContentFeed";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

const Homepage = () => {
  return (
    <Box>
      <Box w={"100%"} h={"92vh"}>
        <ThreeSpotlight />
      </Box>
      <Schedule/>
      <Timeline/>
      <ContentFeed/>
      <Contact/>
      <Footer/>
    </Box>
  );
};

export default Homepage;
