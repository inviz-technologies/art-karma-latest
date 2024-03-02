import { Box } from "@chakra-ui/react";
import Navbar from "../../components/Navbar";
import Hero from "../../components/Hero";
import { useLocation } from "react-router-dom";
import Footer from "../../components/Footer";

const Layout = (props) => {
  const location = useLocation();
  console.log(location);
  return (
    <Box minH={"100dvh"} overflowY={"auto"}>
      <Navbar />
      <Hero />
      {props.children}
      <Footer />
    </Box>
  );
};

export default Layout;
