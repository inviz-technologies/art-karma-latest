import { Box } from "@chakra-ui/react";
import Navbar from "../../components/Navbar";
import Hero from "../../components/Hero";
import Footer from "../../components/Footer";

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  return (
    <Box minH={"100dvh"} overflowY={"auto"}>
      <Navbar />
      <Hero />
      {children}
      <Footer />
    </Box>
  );
};

export default Layout;
