import { Heading, Text, Icon, Container } from "@chakra-ui/react";
import { MdCheckCircle } from "react-icons/md";

const ThankYouScreen = () => {
  return (
    <Container
      textAlign="center"
      mt={20}
      border="1px solid #ccc"
      py="10"
      borderRadius="lg"
    >
      <Icon as={MdCheckCircle} color="green.500" boxSize={24} mb={4} />
      <Heading as="h2" size="xl" mb={4}>
        Thank You!
      </Heading>
      <Text fontSize="xl" mb={4}>
        Your submission has been received.
      </Text>
      <Text fontSize="md" color="gray.600">
        We will Get Back to you soon!
      </Text>
    </Container>
  );
};

export default ThankYouScreen;
