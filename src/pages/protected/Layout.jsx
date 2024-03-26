import { Box } from "@chakra-ui/react";
import Navbar from "../../components/Navbar";
import Hero from "../../components/Hero";
import { useLocation } from "react-router-dom";
import Footer from "../../components/Footer";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setPath } from "../../redux/features/path/pathSlice";

const Layout = (props) => {
  const location = useLocation();

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
