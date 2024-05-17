import Layout from "./Layout";
import { Box, Button, Container, Flex, Text, useToast } from "@chakra-ui/react";
import ImageGallery from "react-image-gallery";
import { useParams } from "react-router-dom";
import { useGetProductQuery } from "../../redux/apis/product.api";
import { useAddNewOrderMutation } from "../../redux/apis/order.api";
import { useSelector } from "react-redux";

const Product = () => {
  const toast = useToast();
  const { id } = useParams();
  const auth = useSelector((state) => state.authSlice);
  const { data, isLoading, isError, error } = useGetProductQuery(id);
  const [AddNewOrder, { isLoading: isPending }] = useAddNewOrderMutation();

  if (isError) {
    return (
      <div>
        Error While fetching Product! || {error?.response?.data?.message}
      </div>
    );
  } else if (isLoading) {
    return <div>Loading...</div>;
  }

  const images = data?.data?.product.images.map((image) => {
    return { original: image.imageUrl, thumbnail: image.imageUrl };
  });

  // console.log(images);
  // console.log(data);
  // console.log(auth?.user);

  const handleAddToCart = async (product) => {
    try {
      const payload = {
        order: product._id,
        user: auth?.user._id,
      };

      await AddNewOrder(payload).unwrap();

      // Display success toast
      toast({
        title: "Item added to cart",
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
            <Button
              bg={"golden"}
              color={"white"}
              isLoading={isPending}
              onClick={() => handleAddToCart(data?.data?.product)}
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
