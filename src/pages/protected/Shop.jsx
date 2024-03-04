// import React, { useState } from "react";
// import Layout from "./Layout";
// import { Box, Collapse, Icon, List, ListItem, Text } from "@chakra-ui/react";
// import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";

// const Shop = () => {
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [selectedSubcategory, setSelectedSubcategory] = useState(null);

//   const mainCategories = Array.from({ length: 10 }, (_, index) => ({
//     id: index + 1,
//     name: `Main Category ${index + 1}`,
//     subcategories: Array.from(
//       { length: 3 },
//       (__, subIndex) => `Subcategory ${subIndex + 1}`
//     ),
//   }));

//   const handleToggleSubcategories = (categoryId) => {
//     setSelectedCategory(selectedCategory === categoryId ? null : categoryId);
//     setSelectedSubcategory(null); // Reset selected subcategory when changing main category
//   };

//   const handleSelectSubcategory = (subcategory) => {
//     setSelectedSubcategory(subcategory);
//   };

//   return (
//     <Layout>
//       <Box
//         w="30vh"
//         h="100vh"
//         bg="gray.200"
//         p="6"
//         boxShadow="md"
//         background={"#FFFAEE"}
//       >
//         <Text fontWeight="bold" fontSize={25} paddingY={5}>
//           All Categories
//         </Text>

//         <List spacing={7}>
//           {mainCategories.map((mainCategory) => (
//             <React.Fragment key={mainCategory.id}>
//               {/* Main Category */}
//               <ListItem
//                 cursor="pointer"
//                 display="flex"
//                 alignItems="center"
//                 justifyContent={"space-between"}
//                 onClick={() => handleToggleSubcategories(mainCategory.id)}
//               >
//                 <Text fontWeight="bold">{mainCategory.name}</Text>
//                 <Icon
//                   as={
//                     selectedCategory === mainCategory.id
//                       ? ChevronUpIcon
//                       : ChevronDownIcon
//                   }
//                   // ml="2"
//                 />
//               </ListItem>

//               {/* Subcategories */}
//               <Collapse in={selectedCategory === mainCategory.id}>
//                 <List marginLeft={7} spacing={3} listStyleType="disc">
//                   {mainCategory.subcategories.map((subcategory, index) => (
//                     <ListItem
//                       cursor={"pointer"}
//                       key={index}
//                       color={
//                         selectedSubcategory === subcategory
//                           ? "#CF9B21"
//                           : "inherit"
//                       }
//                       onClick={() => handleSelectSubcategory(subcategory)}
//                     >
//                       <Text fontWeight={"bold"}>{subcategory}</Text>
//                     </ListItem>
//                   ))}
//                 </List>
//               </Collapse>
//             </React.Fragment>
//           ))}
//         </List>
//       </Box>
//     </Layout>
//   );
// };

// export default Shop;

import React, { useState } from "react";
import Layout from "./Layout";
import {
  Box,
  Collapse,
  Grid,
  GridItem,
  Icon,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";
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

  const products = Array.from({ length: 9 }, (_, index) => ({
    id: index + 1,
    title: `Product ${index + 1}`,
    price: `$${(index + 1) * 10}`,
    imageUrl: `https://via.placeholder.com/150`, // Replace with actual image URL
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
      <Box display={"flex"} gap={"200px"} overflowY={"auto"}>
        <Box
          w="30vh"
          // h="100vh"
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
        <Box
          p="6"
          marginY={10}
          flex={0.8}
          alignSelf={"center"}
          justifyContent={"center"}
        >
          <Grid templateColumns="repeat(3, 1fr)" gap={6}>
            {products.map((product) => (
              <GridItem key={product.id}>
                <Box
                  bg="white"
                  p={4}
                  boxShadow="md"
                  borderRadius="md"
                  textAlign="center"
                >
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    style={{ width: "100%", height: "auto" }}
                  />
                  <Text mt={2} fontWeight="bold">
                    {product.title}
                  </Text>
                  <Text color="gray.500">{product.price}</Text>
                </Box>
              </GridItem>
            ))}
          </Grid>
        </Box>
      </Box>

      {/* Product Items */}
    </Layout>
  );
};

export default Shop;
