import { Box, Image, Input, Text, VStack, Button } from "@chakra-ui/react";
import { loginBg, logo } from "../assets";
import useAuth from "../hooks/useAuth";
import { Controller } from "react-hook-form";

const Login = () => {
  const { login, handleSubmit, control, loginLoading } = useAuth();
  

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
          <Controller
            control={control}
            name="email"
            key="email"
            rules={{
              required: { value: true, message: "Email is required!" },
              pattern: {
                value:
                  /^[\w.+-]+@[\w.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?(?:\.[a-zA-Z]{2,})?$/,
                message: "Please enter a valid email address.",
              },
            }}
            render={({
              field: { name, onBlur, onChange, value },
              fieldState: { error },
            }) => (
              <Input
                minW={"350px"}
                bg={"gray"}
                borderRadius={0}
                border={"none"}
                w={"100%"}
                value={value}
                onChange={onChange}
                onError={error}
                maxW={"400px"}
                placeholder="Email"
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            key="password"
            rules={{
              required: { value: true, message: "Password is required!" },
            }}
            render={({
              field: { name, onBlur, onChange, value },
              fieldState: { error },
            }) => (
              <Input
                minW={"350px"}
                bg={"gray"}
                borderRadius={0}
                border={"none"}
                w={"100%"}
                maxW={"400px"}
                value={value}
                onChange={onChange}
                onError={error}
                placeholder="Password"
                type="password"
              />
            )}
          />
          <Button
            onClick={handleSubmit(login)}
            w={"100%"}
            color={"white"}
            bg={"golden"}
            isLoading={loginLoading}
          >
            Login
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default Login;
