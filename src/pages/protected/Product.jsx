import React from "react";
import Layout from "./Layout";
import { Box, Button, Container, Flex, Text } from "@chakra-ui/react";
import ImageGallery from "react-image-gallery";
import { useParams } from "react-router-dom";

const Product = () => {
  const { id } = useParams();
  const images = [
    {
      original: "https://picsum.photos/id/1018/1000/600/",
      thumbnail: "https://picsum.photos/id/1018/250/150/",
    },
    {
      original: "https://picsum.photos/id/1015/1000/600/",
      thumbnail: "https://picsum.photos/id/1015/250/150/",
    },
    {
      original: "https://picsum.photos/id/1019/1000/600/",
      thumbnail: "https://picsum.photos/id/1019/250/150/",
    },
  ];

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
              12in X 13in
            </Text>
            <Text fontSize={34} mb={5} color={"golden"} fontWeight={"400"}>
              $ 100.00
            </Text>
            <Text fontSize={20} mb={5} color={"gray.400"} fontWeight={"400"}>
              Description Lorem ipsum dolor sit amet, consectetur adipisicing
              elit. Quas voluptates, facilis doloribus obcaecati dolorem,
              doloremque unde eius similique eveniet expedita perspiciatis ad!
            </Text>
            <Button bg={"golden"} color={"white"}>
              Add to Cart
            </Button>
          </Box>
        </Flex>
      </Container>
    </Layout>
  );
};

export default Product;
