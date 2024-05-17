import { Box, Text } from "@chakra-ui/react";

const Hero = () => {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      as="header"
      bg={"black"}
      height={"30dvh"}
    >
      <Text fontSize="5xl" color={"white"}>
        {location?.pathname.split("/")[1][0].toUpperCase() +
          location?.pathname.split("/")[1].slice(1)}
      </Text>
    </Box>
  );
};

export default Hero;
