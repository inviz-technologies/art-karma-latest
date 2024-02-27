import { Box, Image, Input, Text, VStack, Button } from "@chakra-ui/react";
import { loginBg, logo } from "../assets";

const Login = () => {
  return (
    <Box
      height={"100vh"}
      display={"flex"}
      flexDirection={{ base: "column", md: "row" }}
    >
      {/* Left side with background image */}
      <Box
        flex={{ base: 1, md: 0.5 }}
        bg={"black"}
        backgroundImage={`url(${loginBg})`}
        backgroundSize="cover"
        backgroundPosition="center"
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Image src={logo} alt="Logo" />
      </Box>

      {/* Right side with login form */}
      <Box
        flex={{ base: 1, md: 0.5 }}
        bg={"yellow"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        p={{ base: 4, md: 8 }}
      >
        <VStack spacing={{ base: 4, md: 8 }} align="stretch">
          <Text
            fontSize={{ base: "xl", md: "2xl" }}
            textAlign={"center"}
            fontWeight={700}
          >
            Login to Continue
          </Text>
          <Input
            minW={"350px"}
            bg={"gray"}
            borderRadius={0}
            border={"none"}
            w={"100%"}
            maxW={"400px"}
            placeholder="Email"
          />
          <Input
            minW={"350px"}
            bg={"gray"}
            borderRadius={0}
            border={"none"}
            w={"100%"}
            maxW={"400px"}
            placeholder="Password"
            type="password"
          />
          <Button  w={"100%"} color={"white"} bg={"golden"}>
            Login
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default Login;
