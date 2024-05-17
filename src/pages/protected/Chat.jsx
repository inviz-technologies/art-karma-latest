import {
  Flex,
  VStack,
  Text,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Avatar,
  Spacer,
  Heading,
} from "@chakra-ui/react";
import { AtSignIcon, ChevronRightIcon } from "@chakra-ui/icons";
import Layout from "./Layout";

function ChatMessage({ message, isUser }) {
  return (
    <Flex
      alignSelf={isUser ? "flex-end" : "flex-start"}
      direction="column"
      maxWidth="70%"
    >
      <Text
        as="span"
        display="block"
        bg={isUser ? "blue.500" : "gray.100"}
        color={isUser ? "white" : "black"}
        px="3"
        py="2"
        borderRadius="lg"
        m="1"
        fontSize="sm"
        align={isUser ? "right" : "left"}
      >
        {message}
      </Text>
      <Text
        as="span"
        fontSize="xs"
        color="gray.500"
        align={isUser ? "right" : "left"}
        mx="3"
      >
        5:45 PM
      </Text>
    </Flex>
  );
}

function ChatWindow() {
  return (
    <VStack
      w="100%"
      maxW={{ base: "100%", md: "600px" }}
      borderWidth="1px"
      borderRadius="lg"
      overflowY="auto"
      bg="white"
      boxShadow="md"
    >
      <Flex w="100%" bg="gray.200" p="4" borderRadius="lg" align="center">
        <Avatar size="sm" name="Admin" src="path_to_admin_avatar.jpg" />
        <Heading as="h5" size="sm" ml="3">
          The Art Karma
        </Heading>
        <Spacer />
        <IconButton
          aria-label="Options"
          icon={<ChevronRightIcon />}
          variant="ghost"
          size="sm"
        />
      </Flex>

      <VStack spacing={4} w="100%" flex="1" p="3" overflowY="auto">
        <ChatMessage message="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." />
        <ChatMessage
          message="It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
          isUser
        />
      </VStack>

      <InputGroup size="md" borderTopWidth="1px" borderColor="gray.200" p="2">
        <Input
          pr="4.5rem"
          type="text"
          placeholder="Your Message"
          borderColor="gray.300"
        />
        <InputRightElement width="4.5rem">
          <IconButton
            aria-label="Send Message"
            icon={<AtSignIcon />}
            h="1.75rem"
            size="sm"
            mr="2"
            colorScheme="blue"
          />
        </InputRightElement>
      </InputGroup>
    </VStack>
  );
}

const Chat = () => {
  return (
    <Layout>
      <Flex align="center" justify="center" h="100vh" bg="gray.50" p={5}>
        <ChatWindow />
      </Flex>
    </Layout>
  );
};

export default Chat;
