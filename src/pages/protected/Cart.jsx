import {
  Button,
  Container,
  HStack,
  Heading,
  Image,
  StackDivider,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  useAddNewOrderMutation,
  useGetOrdersQuery,
} from "../../redux/apis/order.api";
import Layout from "./Layout";

function CartItem({ item }) {
  const [quantity, setQuantity] = useState(1);
  const toast = useToast();

  const [AddNewOrder, { isLoading: isPending }] = useAddNewOrderMutation();
  const auth = useSelector((state) => state.authSlice);

  // Handler function to update the quantity value
  const handleQuantityChange = (value) => {
    setQuantity(value);
  };

  console.log("item order", item?.order);

  const handlePlaceOrder = async (product) => {
    console.log("item", item)
    try {
      const payload = {
        order: item?._id,
        user: auth?.user._id,
      };

      await AddNewOrder(payload).unwrap();

      // Display success toast
      toast({
        title: "Order has been placed!",
        status: "success",
        duration: 3000, // milliseconds
        isClosable: true,
      });
    } catch (error) {
      console.log("Error while adding item", error);
      toast({
        title: error?.response.data.message || "Something went wrong",
        status: "error",
        duration: 3000, // milliseconds
        isClosable: true,
      });
    }
  };

  return (

          <VStack spacing={1} alignItems="stretch" padding={4}>
            <HStack alignItems="center" padding={4}>
              <Image
                boxSize="100px"
                objectFit="cover"
                src={item?.images[0]?.imageUrl}
                alt={item?.images[0]?.imageName}
              />
              <VStack align="stretch" flex="1">
                <Text fontWeight="bold">{item?.name}</Text>
                <Text>{item?.description}</Text>
              </VStack>
            </HStack>
            <CartSummary
              subtotal={item?.price}
              shippingFee={100}
              handlePlaceOrder={handlePlaceOrder}
              item={item}
            />
          </VStack>
        )}

function CartSummary({ subtotal, shippingFee, handlePlaceOrder, item }) {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const total = subtotal + shippingFee;

  console.log("sub total", subtotal);
  return (
    <VStack alignItems="stretch" spacing={4} marginTop={4}>
      <HStack justifyContent="space-between">
        <Text fontSize="lg" fontWeight="semibold">
          Subtotal:
        </Text>
        <Text fontSize="lg" fontWeight="semibold">
          ${subtotal}
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
          onClick={() => handlePlaceOrder(item)}
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
  const products = useSelector(state => state?.productSlice?.products);
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
    (total, item) => total + item?.order?.price,
    0
  );

  console.log("data", data?.data);
  const shippingFee = 100.0;

  console.log("products", products);

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
          {products.map((item) => (
            <CartItem key={item?._id} item={item} />
          ))}
        </VStack>
        {/* <CartSummary subtotal={10} shippingFee={shippingFee} /> */}
      </Container>
    </Layout>
  );
};

export default Cart;
