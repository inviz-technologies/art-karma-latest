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
import { CiShop } from "react-icons/ci";
import { TiMessages } from "react-icons/ti";

const Links = [
  { label: "Shop", icon: <CiShop />, link: "shop" },
  { label: "Chat", icon: <TiMessages />, link: "chat" },
  { label: "Cart", icon: <CiShop />, link: "cart" },
];

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
      href={props.to}
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
                  {Links.map((link, i) => (
                    <NavLink to={link.link} key={i}>
                      <Box display={"flex"} alignItems={"center"} gap={1}>
                        {link.icon}
                        {link.label}
                      </Box>
                    </NavLink>
                  ))}
                </HStack>
              </Flex>

              {isOpen ? (
                <Box pb={4} display={{ md: "none" }}>
                  <Stack as={"nav"} spacing={4}>
                    {Links.map((link, i) => (
                      <NavLink to={link.link} key={i}>
                        {link.icon} {link.label}
                      </NavLink>
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
