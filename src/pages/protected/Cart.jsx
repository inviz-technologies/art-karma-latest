import Layout from "./Layout";
import {
  VStack,
  HStack,
  Image,
  Text,
  StackDivider,
  Button,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Heading,
  Container,
} from "@chakra-ui/react";

function CartItem({ item }) {
  return (
    <HStack spacing={4} alignItems="center" padding={4}>
      <Image
        boxSize="100px"
        objectFit="cover"
        src={item.image}
        alt={item.name}
      />
      <VStack align="stretch" flex="1">
        <Text fontWeight="bold">{item.name}</Text>
        <Text>{item.description}</Text>
      </VStack>
      <NumberInput defaultValue={1} min={1} max={99} width="100px">
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <Text fontWeight="bold">${item.price.toFixed(2)}</Text>
      <Button variant="outline" colorScheme="red">
        Remove
      </Button>
    </HStack>
  );
}

function CartSummary({ subtotal, shippingFee }) {
  const total = subtotal + shippingFee;
  return (
    <VStack alignItems="stretch" spacing={4} marginTop={4}>
      <HStack justifyContent="space-between">
        <Text fontSize="lg" fontWeight="semibold">
          Subtotal:
        </Text>
        <Text fontSize="lg" fontWeight="semibold">
          ${subtotal.toFixed(2)}
        </Text>
      </HStack>
      <HStack justifyContent="space-between">
        <Text fontSize="lg" fontWeight="semibold">
          Shipping Fee:
        </Text>
        <Text fontSize="lg" fontWeight="semibold">
          ${shippingFee.toFixed(2)}
        </Text>
      </HStack>
      <HStack justifyContent="space-between">
        <Text fontSize="xl" fontWeight="bold">
          Total:
        </Text>
        <Text fontSize="xl" fontWeight="bold">
          ${total.toFixed(2)}
        </Text>
      </HStack>
      <Button colorScheme="yellow" size="lg">
        Checkout
      </Button>
    </VStack>
  );
}

const Cart = () => {
  const cartItems = [
    {
      id: 1,
      name: "14IN X 9IN",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      price: 279.0,
      image: "path_to_first_image.jpg", // Replace with your image path
    },
    {
      id: 2,
      name: "12IN X 8IN",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      price: 219.0,
      image: "path_to_second_image.jpg", // Replace with your image path
    },
  ];

  const subtotal = cartItems.reduce((total, item) => total + item.price, 0);
  const shippingFee = 100.0; // Assuming a flat shipping fee

  return (
    <Layout>
      <Container
        maxW="container.xl"
        my={16}
        // border="1px solid gray.100"
        borderRadius="5px"
        p={4}
        bg="yellow"
      >
        <Heading my={8}>Your Shopping Cart</Heading>
        <VStack
          divider={<StackDivider borderColor="gray.200" />}
          spacing={4}
          align="stretch"
        >
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </VStack>
        <CartSummary subtotal={subtotal} shippingFee={shippingFee} />
      </Container>
    </Layout>
  );
};

export default Cart;
