import { useState } from "react";
import { useGetOrdersQuery } from "../../redux/apis/order.api";
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
  useToast,
} from "@chakra-ui/react";

function CartItem({ item }) {
  const [quantity, setQuantity] = useState(0);

  // Handler function to update the quantity value
  const handleQuantityChange = (value) => {
    setQuantity(value);
  };

  // // Debounced function to update the order
  // const debouncedUpdateOrder = debounce((quantity) => {
  //   // Call the updateOrder mutation with the debounced quantity value
  //   updateOrderMutation(quantity);
  // }, 500); // Adjust the debounce delay as needed

  // // Effect to trigger the debounced updateOrder function when quantity changes
  // useEffect(() => {
  //   debouncedUpdateOrder(quantity);
  //   // Cleanup the debounced function on component unmount
  //   return () => debouncedUpdateOrder.cancel();
  // }, [quantity]); // Trigger the effect whenever quantity changes

  return (
    <HStack spacing={4} alignItems="center" padding={4}>
      <Image
        boxSize="100px"
        objectFit="cover"
        src={item.order?.images[0]?.imageUrl}
        alt={item.order?.images[0]?.imageName}
      />
      <VStack align="stretch" flex="1">
        <Text fontWeight="bold">{item.order?.name}</Text>
        <Text>{item.order?.description}</Text>
      </VStack>
      <NumberInput
        defaultValue={quantity} // Set the default value to the quantity state
        min={0}
        max={99}
        width="100px"
        onChange={handleQuantityChange} // Update the quantity state on change
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <Text fontWeight="bold">
        ${(item.order?.price * quantity).toFixed(2)}
      </Text>{" "}
      {/* Calculate the total price based on quantity */}
      <Button variant="outline" colorScheme="red">
        Remove
      </Button>
    </HStack>
  );
}

function CartSummary({ subtotal, shippingFee }) {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const total = subtotal + shippingFee;

  const handlePlaceOrder = () => {
    setIsLoading(true);
    // Display success toast
    toast({
      title:
        "Order Request sent! You will get notified when your order is ready.",
      status: "success",
      duration: 3000, // milliseconds
      isClosable: true,
    });

    setIsLoading(false);
  };

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
      <HStack spacing={10}>
        <Button
          bg={"golden"}
          size="lg"
          maxW={"150px"}
          mt={"10"}
          isDisabled={true}
        >
          Checkout
        </Button>
        <Button
          bg={"golden"}
          size="lg"
          maxW={"200px"}
          mt={"10"}
          onClick={handlePlaceOrder}
          isLoading={isLoading}
        >
          Place Order
        </Button>
      </HStack>
    </VStack>
  );
}

const Cart = () => {
  const { data, isLoading, isError, error } = useGetOrdersQuery();

  if (isError) {
    return (
      <div>
        Error While fetching CartItem! || {error?.response?.data?.message}
      </div>
    );
  } else if (isLoading) {
    return <div>Loading...</div>;
  }

  const subtotal = data?.data?.orders.reduce(
    (total, item) => total + item?.order.price,
    0
  );
  const shippingFee = 100.0;

  console.log(data?.data.orders);

  return (
    <Layout>
      <Container
        maxW="container.xl"
        my={16}
        border="1px solid #eee"
        borderRadius="md"
        p={6}
        bg="yellow"
      >
        <Heading my={4} color="#333">
          Items
        </Heading>
        <VStack
          divider={<StackDivider borderColor="gray.200" />}
          spacing={4}
          align="stretch"
        >
          {data?.data.orders.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}
        </VStack>
        <CartSummary subtotal={subtotal} shippingFee={shippingFee} />
      </Container>
    </Layout>
  );
};

export default Cart;
