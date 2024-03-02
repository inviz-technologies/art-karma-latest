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
        Hero
      </Text>
    </Box>
  );
};

export default Hero;
