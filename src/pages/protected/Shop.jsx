import React, { useState } from "react";
import Layout from "./Layout";
import { Box, Collapse, Icon, List, ListItem, Text } from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  const mainCategories = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    name: `Main Category ${index + 1}`,
    subcategories: Array.from(
      { length: 3 },
      (__, subIndex) => `Subcategory ${subIndex + 1}`
    ),
  }));

  const handleToggleSubcategories = (categoryId) => {
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId);
    setSelectedSubcategory(null); // Reset selected subcategory when changing main category
  };

  const handleSelectSubcategory = (subcategory) => {
    setSelectedSubcategory(subcategory);
  };

  return (
    <Layout>
      <Box
        w="30vh"
        h="100vh"
        bg="gray.200"
        p="6"
        boxShadow="md"
        background={"#FFFAEE"}
      >
        <Text fontWeight="bold" fontSize={25} paddingY={5}>
          All Categories
        </Text>

        <List spacing={7}>
          {mainCategories.map((mainCategory) => (
            <React.Fragment key={mainCategory.id}>
              {/* Main Category */}
              <ListItem
                cursor="pointer"
                display="flex"
                alignItems="center"
                justifyContent={"space-between"}
                onClick={() => handleToggleSubcategories(mainCategory.id)}
              >
                <Text fontWeight="bold">{mainCategory.name}</Text>
                <Icon
                  as={
                    selectedCategory === mainCategory.id
                      ? ChevronUpIcon
                      : ChevronDownIcon
                  }
                  // ml="2"
                />
              </ListItem>

              {/* Subcategories */}
              <Collapse in={selectedCategory === mainCategory.id}>
                <List marginLeft={7} spacing={3} listStyleType="disc">
                  {mainCategory.subcategories.map((subcategory, index) => (
                    <ListItem
                      cursor={"pointer"}
                      key={index}
                      color={
                        selectedSubcategory === subcategory
                          ? "#CF9B21"
                          : "inherit"
                      }
                      onClick={() => handleSelectSubcategory(subcategory)}
                    >
                      <Text fontWeight={"bold"}>{subcategory}</Text>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Layout>
  );
};

export default Shop;
