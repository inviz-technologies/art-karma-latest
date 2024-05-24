import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import {
  Box,
  Button,
  Container,
  Flex,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
  useToast,
} from "@chakra-ui/react";
import ImageGallery from "react-image-gallery";
import { useParams } from "react-router-dom";
import { useGetProductQuery } from "../../redux/apis/product.api";
import { useAddNewOrderMutation } from "../../redux/apis/order.api";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../redux/features/products/productSlice";

const Product = () => {
  const toast = useToast();
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.authSlice);
  const { data, isLoading, isError, error } = useGetProductQuery(id);
  const [AddNewOrder, { isLoading: isPending }] = useAddNewOrderMutation();

  useEffect(() => {
    if (data && data.data && data.data.product) {
      setProduct(data.data.product);
    }
  }, [data]);

  const handleQuantityChange = (valueString) => {
    const value = Number(valueString);
    setQuantity(value);

    if (product) {
      setProduct((prevProduct) => ({
        ...prevProduct,
        price: data.data.product.price * value,
      }));
    }
  };

  const handleAddToCart = async () => {
    if (!product) return;

    try {
      const payload = {
        order: product._id,
        user: auth?.user._id,
      };

      dispatch(setProducts(product))

      // Display success toast
      toast({
        title: "Item added to cart",
        status: "success",
        duration: 3000, // milliseconds
        isClosable: true,
      });

      // Dispatch the updated product to the Redux store
      dispatch(setProducts(product));
    } catch (error) {
      console.log("Error while adding item", error);
      toast({
        title: error?.response?.data?.message || "Something went wrong",
        status: "error",
        duration: 3000, // milliseconds
        isClosable: true,
      });
    }
  };

  if (isError) {
    return (
      <div>
        Error While fetching Product! || {error?.response?.data?.message}
      </div>
    );
  } else if (isLoading) {
    return <div>Loading...</div>;
  }

  const images = data?.data?.product.images.map((image) => ({
    original: image.imageUrl,
    thumbnail: image.imageUrl,
  }));

  return (
    <Layout>
      <Container minW={"1300px"} my={20}>
        <Flex justifyContent={"center"} gap={10}>
          <Box w={"40%"}>
            <ImageGallery
              showNav={false}
              showBullets={true}
              showPlayButton={false}
              items={images}
              lazyLoad={true}
            />
          </Box>
          <Box w={"40%"}>
            <Text fontSize={34} fontWeight={"bold"}>
              {data?.data?.product.name}
            </Text>
            <Text fontSize={34} mb={5} color={"golden"} fontWeight={"400"}>
              $ {data?.data?.product.price}
            </Text>
            <Text fontSize={20} mb={5} color={"gray.400"} fontWeight={"400"}>
              {data?.data?.product.description}
            </Text>
            <NumberInput
              defaultValue={quantity}
              min={1}
              max={99}
              width="100px"
              onChange={handleQuantityChange}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Text fontWeight="bold" marginTop={5}>
              ${(data?.data?.product?.price * quantity).toFixed(2)}
            </Text>
            <Button
              bg={"golden"}
              color={"white"}
              marginTop={10}
              isLoading={isPending}
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          </Box>
        </Flex>
      </Container>
    </Layout>
  );
};

export default Product;
