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
import { useDispatch, useSelector } from "react-redux";
import {
  useAddNewOrderMutation,
  useGetOrdersQuery,
  useUpdateOrderMutation,
} from "../../redux/apis/order.api";
import Layout from "./Layout";
import { removeProduct } from "../../redux/features/products/productSlice";

function CartItem({ item, products}) {
  const [quantity, setQuantity] = useState(1);
  const toast = useToast();

  const [AddNewOrder, { isLoading: isPending }] = useAddNewOrderMutation();
  const [UpdateOrder, { isLoading: updateLoading }] = useUpdateOrderMutation();
  const shippingFee = 100;
  const auth = useSelector((state) => state.authSlice);

  // Handler function to update the quantity value
  const handleQuantityChange = (value) => {
    setQuantity(value);
  };

  console.log("item order", item);

  const handlePlaceOrder = async (product) => {
    console.log("item", item);
    try {
      console.log("item console", item);

      const orderPayload = {
        order: item?._id,
        user: auth?.user._id,
      };

      const orderRes = await AddNewOrder(orderPayload).unwrap();

      console.log("muneeb check 1".orderRes?.data?.order?._id);
      if (orderRes?.data) {
        const updateOrderPayload = {
          id: orderRes?.data?.order?._id,
          subTotal: item?._id == products[0]._id ? shippingFee + Number(item?.price) : Number(item?.price),
          quantity: item?.quantity,
        };

        console.log("muneeb check 3", updateOrderPayload);

        const _updateRes = await UpdateOrder(updateOrderPayload);

        if (_updateRes) {
          console.log("muneeb check 2", _updateRes);

          toast({
            title: "Order has been placed1!",
            status: "success",
            duration: 3000, // milliseconds
            isClosable: true,
          });
        }
      }

      // Display success toast
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
        shippingFee={shippingFee}
        handlePlaceOrder={handlePlaceOrder}
        item={item}
        products={products}
      />
    </VStack>
  );
}

function CartSummary({ subtotal, shippingFee, handlePlaceOrder, item, products }) {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const total = item?._id == products[0]._id ? subtotal + shippingFee : subtotal;
  const dispatch = useDispatch()

  console.log("sub total", subtotal);

  const handleRemove = () => {

    
    dispatch(removeProduct(item?._id))
  }

  console.log(products[0]?._id == item?._id)
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
      {products[0]._id == item?._id && (

      <HStack justifyContent="space-between">
        <Text fontSize="lg" fontWeight="semibold">
          Shipping Fee:
        </Text>
        <Text fontSize="lg" fontWeight="semibold">
          ${shippingFee.toFixed(2)}
        </Text>
      </HStack>
      )}
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
        </Button >
        <Button variant="outline" colorScheme="red" 
          size="lg"
          maxW={"200px"}
          onClick={handleRemove}
          mt={"10"}>
        Remove
      </Button>
      </HStack>
    </VStack>
  );
}

const Cart = () => {
  const { data, isLoading, isError, error } = useGetOrdersQuery();
  const products = useSelector((state) => state?.productSlice?.products);
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
            <CartItem key={item?._id} item={item} products={products}/>
          ))}
        </VStack>
        {/* <CartSummary subtotal={10} shippingFee={shippingFee} /> */}
      </Container>
    </Layout>
  );
};

export default Cart;
