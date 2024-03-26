import React from "react";
import Layout from "./Layout";
import { Box, Container, Flex } from "@chakra-ui/react";

const Cart = () => {
  return (
    <Layout>
      <Container
        maxW={"1300px"}
        minW={"1100px"}
        h={"600px"}
        my={20}
        bg={"yellow"}
        padding={10}
      >
        <Flex flex={1}>
          <Box flex={0.2}>Items</Box>
          <Box flex={0.2}>Name</Box>
          <Box flex={0.2}>Description</Box>
          <Box flex={0.2}>Quantity</Box>
          <Box flex={0.2}>Price</Box>
        </Flex>
        <Flex flex={1}>
          <Box flex={0.2}>Items</Box>
          <Box flex={0.2}>Name</Box>
          <Box flex={0.2}>Description</Box>
          <Box flex={0.2}>Quantity</Box>
          <Box flex={0.2}>Price</Box>
        </Flex>
      </Container>
    </Layout>
  );
};

export default Cart;
