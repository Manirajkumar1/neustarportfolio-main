import { Box } from "@chakra-ui/react";
import ThreeSpotlight from "../components/ThreeSpotlight";
import Schedule from "../components/Schedule";
import Timeline from "../components/Timeline";
import ContentFeed from "../components/ContentFeed";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Pricing from "../components/Pricing";

const Homepage = () => {
  return (
    <Box>
      {/* Home Section */}
      <Box id="home" w={"100%"} h={"92vh"}>
        <ThreeSpotlight />
      </Box>
      <Schedule />
        <Timeline />
        <Pricing />
      {/* Blog Section */}
      <Box id="blog">
        
        <ContentFeed />
      </Box>

      {/* Contact Section */}
      <Box id="contact">
        <Contact />
        <Footer />
      </Box>
    </Box>
  );
};

export default Homepage;
