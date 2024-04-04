import React, { useState } from "react";
import Layout from "./Layout";
import {
  Box,
  Collapse,
  Grid,
  GridItem,
  Icon,
  Image,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { useGetCategoriesQuery } from "../../redux/apis/category.api";
import { useGetProductsQuery } from "../../redux/apis/product.api";
import { useNavigate } from "react-router-dom";

const Shop = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [query, setQuery] = useState("");
  const { data, isLoading } = useGetCategoriesQuery();
  const products = useGetProductsQuery(query);

  document.title = "The Art Karma | Products";

  const handleToggleSubcategories = (categoryId) => {
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId);
    // setSelectedSubcategory(null);
    // setQuery("");
  };

  const handleSelectSubcategory = (subcategory) => {
    setQuery(`category=${subcategory?._id}`);
    setSelectedSubcategory(subcategory);
  };

  return (
    <Layout>
      <Box display={"flex"} gap={"200px"} overflowY={"auto"}>
        <Box w="30vh" bg="gray.200" p="6" boxShadow="md" background={"#FFFAEE"}>
          <Text fontWeight="bold" fontSize={25} paddingY={5}>
            Categories
          </Text>

          <List spacing={7}>
            {!isLoading &&
              data?.data?.categories?.map((mainCategory) => (
                <React.Fragment key={mainCategory?._id}>
                  <ListItem
                    cursor="pointer"
                    display="flex"
                    alignItems="center"
                    justifyContent={"space-between"}
                    onClick={() => handleToggleSubcategories(mainCategory._id)}
                  >
                    <Text textTransform={"capitalize"} fontWeight="bold">
                      {mainCategory?.name}
                    </Text>
                    <Icon
                      as={
                        selectedCategory === mainCategory?._id
                          ? ChevronUpIcon
                          : ChevronDownIcon
                      }
                    />
                  </ListItem>

                  <Collapse in={selectedCategory === mainCategory._id}>
                    <List marginLeft={7} spacing={3} listStyleType="disc">
                      {mainCategory?.subCategories?.map(
                        (subcategory, index) => {
                          return (
                            <ListItem
                              cursor={"pointer"}
                              key={index}
                              color={
                                selectedSubcategory === subcategory
                                  ? "#CF9B21"
                                  : "inherit"
                              }
                              onClick={() =>
                                handleSelectSubcategory(subcategory)
                              }
                            >
                              <Text
                                textTransform={"capitalize"}
                                fontWeight={"bold"}
                              >
                                {subcategory?.name}
                              </Text>
                            </ListItem>
                          );
                        }
                      )}
                    </List>
                  </Collapse>
                </React.Fragment>
              ))}
          </List>
        </Box>
        <Box
          p="6"
          marginY={4}
          flex={0.8}
          alignSelf={"center"}
          justifyContent={"center"}
        >
          {query === "" && (
            <Text fontWeight="bold" fontSize={25} paddingY={5}>
              All Categories
            </Text>
          )}
          {!!selectedSubcategory && (
            <Box mb={5}>
              <Text
                fontWeight="bold"
                fontSize={25}
                textTransform={"capitalize"}
              >
                {selectedSubcategory?.name}
              </Text>
              <Text fontWeight="500" fontSize={18} textTransform={"capitalize"}>
                {selectedSubcategory?.description}
              </Text>
            </Box>
          )}
          <Grid templateColumns="repeat(3, 1fr)" gap={6}>
            {products?.data?.data?.products?.map((product) => (
              <GridItem
                key={product._id}
                onClick={() => navigate(`${product?._id}`)}
              >
                <Box
                  bg="white"
                  pb={4}
                  width={350}
                  boxShadow="lg"
                  borderRadius="md"
                  textAlign="center"
                  display={"flex"}
                  flexDir={"column"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  cursor={"pointer"}
                >
                  <Box
                    height={280}
                    width={350}
                    overflow={"hidden"}
                    borderRadius={10}
                  >
                    <Image
                      src={product?.images[0].imageUrl}
                      alt={product?.name}
                      height={280}
                      width={350}
                      bgSize={"cover"}
                      transition="transform 0.3s ease-in-out"
                      _hover={{ transform: "scale(1.2)" }}
                    />
                  </Box>

                  <Box
                    alignSelf={"flex-start"}
                    display={"flex"}
                    flexDir={"column"}
                    alignItems={"flex-start"}
                    mt={2}
                  >
                    <Text textTransform={"uppercase"} fontSize={"24px"}>
                      {product?.name}
                    </Text>
                    <Text>{product?.description}</Text>
                    <Text fontSize={"24px"}>${product?.price.toFixed(2)}</Text>
                  </Box>
                </Box>
              </GridItem>
            ))}
          </Grid>
        </Box>
      </Box>
    </Layout>
  );
};

export default Shop;
