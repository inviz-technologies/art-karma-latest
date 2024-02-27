import {
  Avatar,
  Box,
  Container,
  Flex,
  HStack,
  IconButton,
  Button,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { logoSmall } from "../../assets";
import { IoIosMenu } from "react-icons/io";
import { IoClose } from "react-icons/io5";

const Links = ["Shop", "Chat", "Cart"];

const NavLink = (props) => {
  const { children } = props;

  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        // bg: useColorModeValue("gray.200", "gray.700"),
      }}
      href={"#"}
    >
      {children}
    </Box>
  );
};

const Shop = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box>
      <Box as="header" bg={"black"} h={"400px"}>
        <Container py={5} maxW={"1200px"} as="nav" color={"white"}>
          <>
            <Box px={4}>
              <Flex
                h={16}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <IconButton
                  size={"md"}
                  icon={
                    isOpen ? (
                      <IoClose size={35} color={"white"} />
                    ) : (
                      <IoIosMenu size={35} color={"white"} />
                    )
                  }
                  aria-label={"Open Menu"}
                  display={{ md: "none" }}
                  onClick={isOpen ? onClose : onOpen}
                />
                <HStack spacing={8} alignItems={"center"}>
                  <Image
                    src={logoSmall}
                    alt="art karma logo"
                    objectFit={"contain"}
                  />
                </HStack>
                <HStack
                  as={"nav"}
                  spacing={4}
                  display={{ base: "none", md: "flex" }}
                >
                  {Links.map((link) => (
                    <NavLink key={link}>{link}</NavLink>
                  ))}
                </HStack>
              </Flex>

              {isOpen ? (
                <Box pb={4} display={{ md: "none" }}>
                  <Stack as={"nav"} spacing={4}>
                    {Links.map((link) => (
                      <NavLink key={link}>{link}</NavLink>
                    ))}
                  </Stack>
                </Box>
              ) : null}
            </Box>
          </>
        </Container>
      </Box>
    </Box>
  );
};

export default Shop;
